import mongoose from 'mongoose'

const Schema = mongoose.Schema;

const recipeSchema = new Schema({
  // TODO: write the schema
});

const Recipe = mongoose.model('Recipe', recipeSchema);

export default Recipe
