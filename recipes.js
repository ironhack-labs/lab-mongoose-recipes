// import { Model } from 'mongoose';

const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const data = require('./data.js')

mongoose.connect('mongodb://localhost/recipeApp')
  .then(() => {
    console.log('Connected to Mongo!')
  }).catch(err => {
    console.error('Error connecting to mongo', err)
  });

// const Schema   = mongoose.Schema;

const recipeSchema = new Schema({
  title : String,
  level: {
    type: String,
    enum: ["Easy Peasy", "Amateur Chef", "UltraPro Chef"],
    default: "Easy Peasy"
  },
  ingredients: [],
  cuisine: String,
  dishType: {
    type: String,
    enum: ["Breakfast", "Dish", "Snack", "Drink", "Dessert", "Other"],
    default: "Dish"
  },
  image: {
    type: String,
    default: "https://images.media-allrecipes.com/images/75131.jpg" 
  },
  duration: {type: Number, min:0},
  creator: String,
  created: {
    type: Date,
    default: Date.now()
  },

});

const Recipe = mongoose.model("Recipe", recipeSchema)


Recipe.create ({ 
      title: "Sweet Mashed Potoes", 
      level: 'Easy Peasy',
      ingredients: ["Sweet Potatoes" , "Butter", "salt & Pepper", "Cream"] , 
      image: 'https://sweetpeaskitchen.files.wordpress.com/2010/08/maple-mashed-sweet-potatoes.jpg', 
      cuisine: "American", 
      duration: 30 , 
      dishType: "Other",
      creator: "Martha Stewart",
    })
    .then((recipe)=> {
      console.log("recipe created", recipe)
    })
    .catch((error)=> {
      console.log(error)
    });



Recipe.insertMany( data, function (error, data) {
  data.forEach((data)=> {
    console.log(' --> recipes: ', data.title);
})
});
    
Recipe.updateOne({ title: 'Rigatoni alla Genovese'}, { duration: 100 })
.then((recipe) => {
    console.log("WE DID IT", recipe)
  })

.catch(error =>{
  console.log(error)
})


Recipe.deleteOne({ title: 'Carrot Cake'})
.then((recipe) => {
  console.log("CARROT CAKE REMOVED", recipe)
})

.catch(error =>{
console.log(error)
})


// mongoose.connection.close()