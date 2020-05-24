const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const recipeSchema = new Schema({
 title: {
   type: String,
   unique: true,
   required: true
 },

 level: {
   type: String,
   enum: ["easy", "intermedidate","difficult"]
} ,
 ingredients: [String],
 cuisine: {
   type: String,
   required: true
 },
 dishtype: String,
 image: {
   type: String,
   default:"https://images.media-allrecipes.com/images/75131.jpg"
 },
 duration:{
   type: Number,
   min: 0
 },
 creator: String,
 created: {
   type: Date,
   default: 24/5/2020
 }
});

const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;
