const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');
const { db } = require('./models/Recipe.model');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app"
async function updateRecipes() {

try {
    await mongoose
    .connect(MONGODB_URI)
  
    await Recipe.deleteMany()
    console.log('database connected')
      
    let newRecipe = { title: 'Pasta Ragu', level: 'Easy Peasy', ingredients: ['pasta', 'mince meat', 'tomatoes', 'onions', 'garlic', 'spinach'], cuisine: 'Italian', dishType: 'main_course', image: 'https://www.insidetherustickitchen.com/wp-content/uploads/2017/11/Italian-Beef-Ragu-Square-Inside-the-rustic-kitchen.jpg', duration: 30, creator: 'Chef Hollie'};

    let createdRecipe = await Recipe.create(newRecipe);
    console.log(createdRecipe.title);

    let allRecipes = await Recipe.insertMany(data)
    allRecipes.forEach((recipe) => console.log(recipe.title))

    await Recipe.findOneAndUpdate({title: 'Rigatoni alla Genovese'}, { duration: 100 })
    console.log('Update Successful')

    await Recipe.findOneAndDelete({title:'Carrot Cake'})
    console.log('Delete Successful')

    await mongoose.connection.close()
    console.log('Database Closed')
  
}

catch (error) {
    console.log('Error connecting to the database', error)
  }
  
}

updateRecipes();
  

  