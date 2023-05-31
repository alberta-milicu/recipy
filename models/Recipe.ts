import mongoose, { Document } from 'mongoose';

export interface IRecipe extends Document {
  likesCount: number;
  name: string;
  ingredients: string;
  likedUsers: string[];
}

const recipeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    ingredients: {
      type: String,
      required: true,
    },
    likedUsers: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true },
);

const Recipe = mongoose.model<IRecipe>('Recipe', recipeSchema);

export default Recipe;