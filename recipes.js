const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const data = require('./data.js');

mongoose.connect('mongodb://localhost/recipeApp')
  .then(() => {
    console.log('Connected to Mongo!');
  }).catch(err => {
    console.error('Error connecting to mongo', err);
  });

const recipeSchema = new Schema ({
  title : {type : String, required : true, unique : true},
  level : ['Easy Peasy', 'Amateur Chef', 'UltraPro Chef'],
  ingredients : [String],
  cuisine : {type : String, required : true},
  dishType : ['Breakfast', 'Dish', 'Snack', 'Drink', 'Dessert', 'Other'],
  image : {
    type : String, 
    default: "https://images.media-allrecipes.com/images/75131.jpg.",
  },
  duration : {type : Number, min : 0},
  creator : String,
  created : {
    type : Date,
    default : Date.now}
})

const Recipe = mongoose.model("Recipe", recipeSchema);


// ####################################################################################

Recipe.create({title : "Spaghetti carbonara", cuisine : 'Italian'})
    // success
    .then(()=>{
        console.log("RECIPE CREATE WORKED 🍝")
    })
    // error
    .catch(()=>{
        console.log("RECIPE CREATE FAILED 🍽")
    });

Recipe.insertMany(data)
  // success
  .then(console.log(`Recipes inserted`))
  // error
  .catch(()=>{
      console.log("Bulk creation FAILED")
});

Recipe.findOneAndUpdate({ title : {$eq: "Rigatoni alla Genovese"}}, {$set:{duration : 100}})
    .then(doc => {console.log(`Rigatoni duration updated to ${doc.duration}`)})
    .catch((err) => {
    console.log("FAILED 😿", err)
    });

Recipe.findOneAndRemove({ title : {$eq: "Carrot Cake"}})
  .then(doc=>{
      console.log(`DELETED ${doc.title}`)
  })
  .catch(err => {
      console.log("Remove FAILED 😿", err)
  });