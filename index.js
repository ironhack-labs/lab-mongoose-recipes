const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then(x => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })

  // Iteration 2
  .then(() => {
    const myRecipe = {
      title: 'Nem',
      level: 'Easy Peasy',
      ingredients: ['rice cakes', 'meat', 'rice vermicelli', 'mushrooms', 'carrots', 'spring onions', 'garlic', 'salt', 'pepper'],
      cuisine: 'Asian',
      dishType: 'main_course',
      image: 'https://i0.wp.com/culture-crunch.com/wp-content/uploads/2021/02/ems.jpg?w=498&ssl=1',
      duration: 60,
      creator: 'me'
    }
    return Recipe.create(myRecipe)
      .then(newProduct => console.log("a tile of product was created", newProduct.title))
      .catch(err => console.log("Creat failure", err))
  })

  // Iteration 3  
  .then(() => {
    return Recipe.insertMany(data)
      .then(productsArr => {
        productsArr.forEach(product => console.log(product.title))
      })
      .catch(err => console.log("Creat failure", err))
  })

  // Iteration 4
  .then(() => {
    return Recipe.findOneAndUpdate(
      { title: 'Rigatoni alla Genovese' },
      { $set: { duration: 100 } }
    )
      .then(() => console.log('Update successfull'))
      .catch(err => console.log("Update failure", err))
  })

  // Iteration 5
  .then(() => {
    return Recipe.deleteOne({ title: 'Carrot Cake' })
      .then(() => console.log('Delete successfull'))
      .catch(err => console.log("Delete failure", err))
  })

  .catch(error => {
    console.error('Error connecting to the database', error);
  });


// Iteration 6
mongoose.connection.close(() => console.log("Mongoose connection closed"))