import mongoose, { Document } from 'mongoose';

export interface IRecipe extends Document {
  name: string;
  ingredients: string;
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
  },
  { timestamps: true },
);

const Recipe = mongoose.model<IRecipe>('Recipe', recipeSchema);

export default Recipe;