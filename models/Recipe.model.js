const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const recipeSchema = new Schema({
  title : String,
  level: String,
  ingredients: [String],
  cuisine: String,
  dishType: String,
  image:  String,
  duration: Number,
  creator: String,
  created: Date,
});

const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;


const BookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      unique: true,
    },
    author: String,
    releaseDate: Date,
    publisher: String,
    pages: Number,
    issue: Number,
    isInPreSale: Boolean,
  },
  {
    timestamps: true,
  }
);