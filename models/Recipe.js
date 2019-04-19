const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const recipeSchema = new Schema({
 title:{
   type:String,
   unique:true

 },
 level:{
   type: String,
   enum:['Easy Peasy' , 'Amateur Chef ',' UltraPro Chef']
 },
 ingredients:[String],

cuisine:{
  type:String,
  require:true
},
dishType:{
  type:String,

},

image{
  type:String,
  require:
}



});

const Recipe = mongoose.model('Recipe', recipeSchema);
module.exports = Recipe;

dishType. Type String. Possible values: Breakfast - Dish - Snack - Drink - Dessert - Other.
image. Type String. Default value: https://images.media-allrecipes.com/images/75131.jpg.
duration. Type Number. Min value should be 0.
creator. Type String
created. Type Date. By default today.