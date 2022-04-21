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
  .then(() => {
    // Run your code here, after you have insured that the connection was made
  const myRecipe= {
    title: 'Pizza',
    level: 'Easy Peasy',
    ingredients: ['bread','salami','olives','tomatos'],
    cuisine: 'Italian',
    dishType: 'main_course',
    image: 'https://www.eat-this.org/wp-content/uploads/2020/06/eat_this_die_perfekte_vegane_pizza-22-615x410@2x.jpg',
    duration: 30,
    creator: 'myself',
  }
  return Recipe.create(myRecipe)
  .then(newProduct => console.log("a new product created", newProduct.title))
  .catch((error)=>{
    console.log("error while creating a new product", error)
  })
  })

  // Iteration 3
  .then(() => {
    return Recipe.insertMany(data)
      .then(productsArr => {
        productsArr.forEach(product => console.log(product.title))
      })
      .catch(error => console.log("Creat failure", error))
  })

// Iteration 4

.then(() => {
  return Recipe.findOneAndUpdate({title: 'Rigatoni alla Genovese'},{$set: {duration: 100}})
    .then(()=> console.log('Update Successful'))
    .catch(error => console.log("Create failure", error))
})


// Iteration 5

.then(() => {
  return Recipe.deleteOne({title: 'Carrot Cake'})
    .then(()=> console.log('Update Successful Carrot Deleted'))
    .catch(error => console.log("Carrot Delete failed", error))
})

.catch((error => console.log("Error connecting to DB", error)))

// Iteration 6

mongoose.connection.close(()=> console.log("Mongoose Connection Closed"))