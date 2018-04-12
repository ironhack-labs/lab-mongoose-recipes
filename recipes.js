const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const data = require('./data.js')

mongoose.connect('mongodb://localhost/recipeApp')
  .then(() => {
    console.log('Connected to Mongo!')
  }).catch(err => {
    console.error('Error connecting to mongo', err)
  });
  const Recipe = mongoose.model ("Recipe", {
    title : String, 
    level : String, 
    ingredients : Array,
    cousine : String,
    dishType : String, 
    image: String,
    duration: Number,
    creator: String,
    created : Date,
   });

  const recipesSchema = new Schema ({
    title :  { type : String, unique : true},
    level :  { type : String, enum : [ 'Easy Peasy', 'Amateur Chef', 'UltraPro Chef']},
    ingredients :  { type : Array },
    cousine :  { type : String, required: true},
    dishType :  { type : String,  enum : [ 'Breakfast', 'Dish', 'Snack', 'Drink', 'Dessert', 'Other']},
    image :  { type : String, default: 'https://images.media-allrecipes.com/images/75131.jpg'},
    duration :  { type : Number, min :0 },
    creator :  { type : String},
    created :  { type : Date, default : new Date()},
  });

  Recipe.create ({ title : 'Omelette', level : 'Easy Peasy', ingredients :[ 'two eggs', 'cheese', 'ham'], cousine : 'French', dishType : ['Breakfast','Dish'], image : 'https://fr.wikipedia.org/wiki/Omelette#/media/File:Flickr_-_cyclonebill_-_Omelet_med_ristede_svampe_og_grøn_salat.jpg', duration : 5, creator : 'Rodrigo & Louis', created : '' });

  Recipe.insertMany (data)
  .then (() =>{
    console.log (`Inserted !`)
  })
  .catch (() =>{
    console.log ("Inserted failed 😡", err);
  });

Recipe.findByIdAndUpdate ("5acf5e7b64ad9c4411e41a93", { $set:{ duration : 100}})
.then ((updatedRecipe) =>{
  console.log (`Update to : ${updatedRecipe.duration}!`)
})
.catch (() =>{
  console.log ("Update failed 😡", err);
});


Recipe.findByIdAndRemove ("5acf5e7b64ad9c4411e41a92")
.then ((removeRecipe) =>{
  console.log (`Remove to : ${removeRecipe.title}!`)
})
.catch (() =>{
  console.log ("Remove failed 😡", err);
});

Recipe.save()
.then ((saveRecipe) =>{
  console.log (`Saved!`)
})
.catch (() =>{
  console.log ("save failed 😡", err);
});
