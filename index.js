const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Create ONE RECIPE

const createOneRecipe = () => {
    Recipe.create(data[0])
    .then((data)=>{
      console.log(`Recipe created: ${data.title}`)
      mongoose.disconnect()
      .then(data => console.log('mongoose disconnected'))
      .catch(err => console.error(err))
    })
    .catch(err => console.error(err))
}

const createManyRecipes = () => {
  Recipe.insertMany(data)
  .then((recipes) => {
    recipes.forEach(recipe => {
      console.log(`Recipe created: ${recipe.title}`)
    })
    mongoose.disconnect()
    .then(data => console.log('mongoose disconnected'))
    .catch(err => console.error(err))
  })
  .catch(err => console.error(err))
}

const updateRecipe = (title) => {
    Recipe.updateOne({ title: title }, { duration: 100 })
    .then((data) => {
      console.log(data)
    mongoose.disconnect()
      .then(data => console.log('mongoose disconnected'))
      .catch(err => console.error(err))
    })
    .catch(err => console.error(err))
}

const deleteRecipe = (title) => {
      Recipe.deleteOne({ title: title })
    .then(data => {
      console.log((data))
      mongoose.disconnect()
      .then(data => console.log('mongoose disconnected'))
      .catch(err => console.error(err))
    }) 
    .catch(err => console.error(err))
}

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(self => {
    console.log(`Connected to the database: "${self.connection.name}"`);
    // Before adding any documents to the database, let's delete all previous entries
    // return self.connection.dropDatabase();
  })
  .then(() => {
    // createOneRecipe()

    createManyRecipes()

    // updateRecipe('Rigatoni alla Genovese')

    // deleteRecipe('Carrot Cake')







    // Run your code here, after you have insured that the connection was made
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  })


