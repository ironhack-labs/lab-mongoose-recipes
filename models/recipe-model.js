const mongoose = require('mongoose');
//we use Schema class given by mongoose
const Schema = mongoose.Schema;

//Iteration#1 create new Schema
const recipeSchema = new Schema ({
    title       : {type : String, required : true, unique : true},
    level       : {type : String, enum : ['Easy Peasy', 'Amateur Chef', 'UltraPro Chef']},
    ingredients : [],
    cuisine     : {type : String, required : true},
    dishType    : {type : String, enum : ['Breakfast', 'Dish', 'Snack', 'Drink', 'Dessert', 'Other']},
    image       : {type : String, default : 'https://images.media-allrecipes.com/images/75131.jpg'},
    duration    : {type : Number, min: 0},
    creator     : {type : String},
    created     : {type : Date, default : Date.now}
  })

//connect the schema with the model we are exporting
const Recipe = mongoose.model('Recipe', recipeSchema);
//we export the model to make it accesible in other files
module.exports = Recipe;