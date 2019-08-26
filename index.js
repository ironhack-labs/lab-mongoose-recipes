const mongoose = require('mongoose')
const Recipe = require('./models/Recipe') // Import Recipe model
const data = require('./data.js') // Import the data

// Connect to recipeApp DB
mongoose.connect('mongodb://localhost/recipeApp', { useNewUrlParser: true })
  .then(() => {
    console.log('Connected to Mongo!')
  }).catch(err => {
    console.error('Error connecting to mongo', err)
  })

// -------------------------------------
// Manually pass data to create one new recipe in the DB
// -------------------------------------
Recipe.create({
  title: 'The Best Tacos Ever',
  level: 'Easy Peasy',
  ingredients: ['Shells, ground beef, cheese, lettuce, tomato, hot sauce'],
  cuisine: 'Mexican',
  dishType: 'Dish',
  image: 'https://www.cookingclassy.com/wp-content/uploads/2019/03/ground-beef-tacos-01.jpg',
  duration: 15,
  creator: 'Dusty',
  created: ''
})
  .then(recipe => { `${recipe} has been created in the database` })
  .catch(err => { 'Error creating new recipe in the database.' })

// ------------------
// Insert many
// ------------------
Recipe.insertMany(data)
  .then(recipeDB => {
    // success message
    console.log('Success! All of the recipes have been added to the database')
    // Print each recipe name
    recipeDB.forEach((recipe) => { console.log(`Added to DB: ${recipe.title}`) })
  })
  .catch(err => { 'Error adding recipes to DB.' })

// ------------------
// Update one
// ------------------
Recipe.updateOne({ creator: 'Dusty' }, { creator: 'Chef Dusty' })
  .then(success => { console.log('The update was successful!') })
  .catch(err => { console.log('Oops, error try again') })

// ------------------
// Delete one
// ------------------
Recipe.deleteOne({ title: 'Carrot Cake' })
  .then(success => { console.log('Carrot Cake has been deleted from the DB.') })
  .catch(err => { console.log('Oops, the delete was unsuccessful. Try again.') })

// ------------------
// Close DB
// ------------------
mongoose.connection.close()
  .then(success => console.log('Mongoose connection disconnected'))
  .catch(err => console.log('Error, mogoose could not disconnecet'))
