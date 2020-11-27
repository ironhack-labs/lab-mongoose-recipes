const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const recipeSchema = new Schema({
  // TODO: write the schema
  title: {
    type: String,
    required: true,
    unique: true,

  },
  level: {
    type: String,
    enum: ["Easy Peasy", "Amateur Chef", "UltraPro Chef"],
  },
  ingredients: {
    type: [String]
  },
  cuisine:{
    type: String,
    require:true,
  },
  dishType:{
    type: String,
    enum: ["breakfast", "main_course", "soup", "snack", "drink", "dessert", "other"],
  },
  image:{
    type:String,
    default: "https://t2.rg.ltmcdn.com/es/images/4/9/8/img_milanesa_de_carne_11894_600.jpg",
  },
  duration:{
    type: Number,
    min: 0,
  },
  creator:{
    type: String
  },
  created:{
    type: Date,
    default: Date.now
  }
});

const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;
