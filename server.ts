import express, { Application, Request, Response } from 'express';
import cors, { CorsOptions } from 'cors';
import bp from 'body-parser';
import mongoose from 'mongoose';
import Recipe, { IRecipe } from './models/Recipe';
import User, { IUser } from './models/User';
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');

// express app
const server: Application = express();

const corsOptions: CorsOptions = {
  origin: 'http://localhost:8080',
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  credentials: true,
};

server.use(cors(corsOptions));

const dbURI: string = 'mongodb+srv://albertamilicu:1234@mydb.ycgvaf3.mongodb.net/friendsDB-?retryWrites=true&w=majority';

mongoose.connect(dbURI)
  .then(() => {
    server.listen(3000);
    console.log('listen!');
  })
  .catch((err) => console.log(err));

// middleware
server.use(bp.json());
server.use(bp.urlencoded({ extended: true }));
server.use(express.json());
server.use(cookieParser());

// HANDLE ERRORS

const handleErrors = (err: any) => {
  console.log(err.message, err.code);

  const errors: { [key: string]: string } = { email: '', password: '' };

  // incorrect email
  if (err.message === 'incorrect email') {
    errors.email = 'that email is not registered';
  }

  if (err.message === 'incorrect password') {
    errors.password = 'that password is incorrect';
  }

  // duplicate email error
  if (err.code === 11000) {
    errors.email = 'that email is already registered';
    return errors;
  }

  // validation errors
  if (err.message.includes('user validation failed')) {
    Object.values(err.errors).forEach(({ properties }: any) => {
      errors[properties.path] = properties.message;
    });
  }

  return errors;
};

//CREATE TOKEN

const maxAge = 72 * 60 * 60;
const createToken = (id: string) => {
  return jwt.sign({ id }, 'jwtString', {
    expiresIn: maxAge
  });
}


// RECIPE ROUTES
server.get('/', (req: Request, res: Response) => {
  res.redirect('/recipes');
});

server.get('/recipes', (req: Request, res: Response) => {
  Recipe.find()
    .then((result: IRecipe[]) => {
      res.send(result);
    })
    .catch((err: Error) => {
      console.log(err);
    });
});

server.post('/recipes', (req: Request, res: Response) => {
  const recipe: IRecipe = new Recipe(req.body);
  recipe.save()
    .then((result: IRecipe) => {
      res.redirect('/recipes');
    })
    .catch((err: Error) => {
      console.log(err);
    });
});

server.delete('/recipes', (req: Request, res: Response) => {
  const id: string = req.body.id;
  Recipe.findByIdAndDelete(id)
    .then(() => {
      res.json({ redirect: '/recipes' });
    })
    .catch((err: Error) => {
      console.log(err);
    });
});

server.post('/recipes/:id/like', async (req: Request, res: Response) => {
  const recipeId: string = req.params.id;
  const { userEmail } = req.body;

  try {
    const recipe: IRecipe | null = await Recipe.findById(recipeId);

    if (!recipe) {
      throw new Error('Recipe not found');
    }

    if (recipe.likedUsers.includes(userEmail)) {
      return res.status(400).json({ error: 'User already liked the recipe' });
    }

    recipe.likedUsers.push(userEmail);
    recipe.likesCount += 1;
    await recipe.save();

    res.status(200).json({ message: 'Recipe liked successfully' });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

server.post('/recipes/:id/unlike', async (req: Request, res: Response) => {
  const recipeId: string = req.params.id;
  const { userEmail } = req.body;

  try {
    const recipe: IRecipe | null = await Recipe.findById(recipeId);

    if (!recipe) {
      throw new Error('Recipe not found');
    }

    const userIndex: number = recipe.likedUsers.findIndex((email: string) => email === userEmail);

    if (userIndex === -1) {
      return res.status(400).json({ error: 'User has not liked the recipe' });
    }

    recipe.likedUsers.splice(userIndex, 1);
    recipe.likesCount -= 1;
    await recipe.save();

    res.status(200).json({ message: 'Recipe unliked successfully' });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// AUTHENTICATION ROUTES

server.get('/login', (req: Request, res: Response) => {
  console.log('entered login')
});

server.post('/login', async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user: IUser = await User.login(email, password);
    const token = createToken(user._id);
    res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
    if (user) {
      res.status(200).json({ user: user._id });
    } else {
      throw new Error('User not found');
    }
  }
  catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }

});

server.get('/logout', (req: Request, res: Response) => {
  res.cookie('jwt', '', { expires: new Date(0) });
  res.clearCookie('jwt');
});

server.get('/signup', (req: Request, res: Response) => {
  console.log('entered signup');
});

server.post('/signup', async (req: Request, res: Response) => {
  console.log('entered signup cookie checker');
  const user: IUser = new User(req.body);

  user.save()
    .then((result: IUser) => {
      const token = createToken(user._id);
      res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
      res.status(201).json({ user: user._id });
    })
    .catch((err: Error) => {
      const errors = handleErrors(err);
      res.status(400).json({ errors });
    });

});

// TESTER ROUTES

server.get('/signups', (req: Request, res: Response) => {
  User.find()
    .then((result: IUser[]) => {
      res.send(result);
    })
    .catch((err: Error) => {
      console.log(err);
    });
});

