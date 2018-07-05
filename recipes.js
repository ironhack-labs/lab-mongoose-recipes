const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const data = require('./data.js');

mongoose.connect('mongodb://localhost/recipeApp')
  .then(() => {
    console.log('Connected to Mongo!');
  }).catch(err => {
    console.error('Error connecting to mongo', err);
  });


  const recipeSchema = new Schema({
    title: String,
    level: {type: String, enum: ["Easy Peasy", "Amateur Chef", "UltraPro Chef"]},
    ingredients: [String],
    cousine: {type: String, required: true},
    dishType: {type:String, enum: ["Breakfast","Dish","Snack","Drink","Dessert","Other"]},
    image: {type: String, default:"https://images.media-allrecipes.com/images/75131.jpg"},
    duration: {type: Number, min: [0, 'min value']},
    creator: String,
    created: {type: Date, default: Date.now}
  });
  //objectID is a type fo mongoos schema, so we can do for example
  // shelterID: Schema.Types.ObjectID --- this would be the correct syntax to make this happen.


const Recipe = mongoose.model('Recipe', recipeSchema);

Recipe.insertMany(data)
      .then(() =>{
        console.log(theData);
      })
      .catch((theError)=> {
        console.log(err);
      });



Recipe.updateOne({"name": "Rigatoni alla Genovese"}, {$set: {duration: 100}})
  .then(() => {
      console.log("Updated One Entry");
  })
  .catch(err =>{
    console.log(err);
  });
