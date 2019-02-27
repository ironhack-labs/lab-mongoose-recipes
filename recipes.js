const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const data = require('./data.js');
const Recipe = require('./models/Recipe.js')

mongoose.connect('mongodb://localhost/recipeApp', {useNewUrlParser: true})
  .then(() => console.log('Connected to Mongo!'))
  .then(() => Recipe.collection.drop())

  .then(() => Recipe.create({
    title : 'Chocolate Cake', 
    level: 'Easy Peasy', 
    ingredients: ['6 cups grated chocolate', '1 cup brown sugar', '4 eggs', '1 1/2 cups white sugar', '1 cup vegetable oil', '2 teaspoons vanilla extract', '3 cups all-purpose flour', '1 1/2 teaspoons baking soda', '1 teaspoon salt', '4 teaspoons ground cinnamon'],
    cuisine: 'International',
    dishType: 'Dessert',
    image: 'https://images.media-allrecipes.com/userphotos/560x315/1130307.jpg',
    duration: 30,
    creator: 'Chef Raluca'
  }))

  .then(recipe => { console.log("The recipe " + recipe.title + " has been created")})
  .then(( ) => Recipe.insertMany(data))
  .then(( ) => {for(let i = 0;i<data.length; i++){
                console.log(data[i].title)
              }
  })
  .then(( ) => Recipe.updateOne({title: 'Rigatoni alla Genovese'},{duration: 100}))
  .then(() => {console.log("The recipe duration has been updated")})
  .then(() => Recipe.findOneAndDelete({title: 'Carrot Cake'}))
  .then(() => {console.log("The recipe has been deleted")})
  .then(() => {mongoose.connection.close(() => {
      console.log("Mongoose connection disconnected after termination")
    })
  })
  .catch(err => {
    console.error('Error connecting to mongo', err);
  });

  





