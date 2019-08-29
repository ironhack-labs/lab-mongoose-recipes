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

// Create a new recipe
let promise1 = Recipe.create({ title: 'Pasta e Fagioli', level: 'Amateur Chef', ingredients: ['8 oz. dried medium white beans', 'Kosher salt', '4 carrots', '1 leek', '6 garlic cloves', '⅓ cup extra-virgin olive oil', 'Freshly ground black pepper', '1 smoked ham hock', '1 15-oz. can whole peeled tomatoes', '1 bunch Tuscan kale', '1–2 Parmesan rinds', '2 bay leaves', '8 oz. small pasta', 'Finely grated Parmesan, crushed red pepper flakes, and crusty bread (for serving)'], cuisine: 'Italian', dishType: 'Dish', image: 'https://images.media-allrecipes.com/userphotos/720x405/815964.jpg', duration: 40, creator: 'Carla Lalli Music' })

// Insert an array of recipes of data.js
let promise2 = Recipe.insertMany(data)

// Update recipe
let promise3 = Recipe.updateOne({ title: 'Rigatoni alla Genovese' }, { duration: 100 })

// Remove a recipe
let promise4 = Recipe.deleteOne({ title: 'Carrot Cake' })


// Run all tasks and close the connection
let runAllTasks = async () => {  
  await Recipe.deleteMany({}).exec()
  await Promise.all([promise1, promise2])
  let value = await Recipe.find({}, 'title')
  console.log(value)
  await Promise.all([promise3, promise4])
  console.log('Duration for Rigatoni alla Genovese has been updated')
  console.log('Carrot cake recipe has been deleted')
  await mongoose.connection.close()
}

runAllTasks()