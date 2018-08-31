const mongoose = require("mongoose");

//Schema constructor from Mongoose
const Schema = mongoose.Schema;

//use the schema constructor to create our cat schema
const recipeSchema = new Schema({
  title: {
    type: String, 
    required: true,
    unique: true,
  },
  level: {type: String},
  ingredients: [ String ], 
  cousine:  {
    type:String,
    required: true,
   },
   dishType: [ String ],

   image: {
     type: String,
     default: " https://images.media-allrecipes.com/images/75131.jpg"
     },
    duration: {
      type: Number,
      min: 0,
    },
    creator: {type: String},
    created:  [Date],
  });


//the variable "Cat" is our Mongoose Model object
//the "Cat" model will allow us to work with the "cats" collection
//("Cat" -> "cat" -> "cats")
  const Recipe = mongoose.model("Recipe", recipeSchema); 

module.exports = Recipe;