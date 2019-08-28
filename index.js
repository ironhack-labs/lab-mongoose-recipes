const mongoose = require('mongoose');
const Recipe = require('./models/Recipe'); // Import of the model Recipe from './models/Recipe'
const data = require('./data.js');  // Import of the data from './data.js'

// Connection to the database "recipeApp"
mongoose.connect('mongodb://localhost/recipeApp', { useNewUrlParser: true })
  .then(() => {
    console.log('Connected to Mongo!');
  }).catch(err => {
    console.error('Error connecting to mongo', err);
  });


//ITERATION 2 - CREATE RECIPE

Recipe.create({
  title: 'Spaghetti Carbonara',
  level: 'Easy Peasy',
  ingredients: ['pancetta', 'pecorino cheese', 'parmesan', 'large eggs', 'spaghetti', 'plump garlic cloves', 'unsalted butter', 'black pepper'],
  cuisine: 'yes',
  dishType: "Dish",
  image: 'http://storenotrefamilleprod.blob.core.windows.net/images/cms/recette/52098/52098_large.jpg',
  duration: 20,
  creator: 'Unknown'
  
})



// ITERRATION 3 - INSERT MANY RECIPE

Recipe.insertMany(data)
.then(newRecipe => console.log(newRecipe.forEach(eachRecipe => console.log("A new Recipe has been created: ", eachRecipe.title))))
.catch(err => console.log("Error while creating a new Recipe! ", err))



//ITERATION 4 - UPDATE RECIPE

Recipe.updateOne({title: 'Rigatoni alla Genovese'}, {duration: 100})
.then(console.log("The duration has been successfully updated"))
.catch( err => console.log('Error, the duration has not been updated', err));

//ITERATION 5 - REMOVE A RECIPE

Recipe.deleteOne({title: 'Carrot Cake'})
.then(console.log("Item has been successfully removed"))
.catch( err => { console.log("Error, the item has not been deleted", err)})


//ITERATION 6 - CLOSE THE DATABASE
mongoose.connection.on('disconnected', () => console.log('Mongoose default connection disconnected'));
process.on('SIGINT', () => {
  mongoose.connection.close(() => {
    console.log('Mongoose default connection disconnected through app termination');
    process.exit(0);
  });
});