const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://127.0.0.1:27017/recipe-app';

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
    return Recipe.create({
      title: 'Albondigas',
      level: 'Amateur Chef',
      ingredients: ['pollo', 'champiñones'],
      cuisine: 'IronHack',
      dishType: 'main_course',
      image: 'https://images.hola.com/imagenes/cocina/recetas/20200312162984/albondigas-en-salsa-faciles/0-797-500/albondigas-en-salsa-t.jpg?tx=w_1200',
      duration: 20,
      creator: 'Angel'
    })
  })
  .then(createdRecipe => {
    console.log(createdRecipe.title) // iteration 2
    return Recipe.insertMany(data)
  })
  .then(createdRecipes => {
    createdRecipes.forEach(elm => {
      console.log(elm.title)
    })
    return Recipe.findOneAndUpdate({ title: "Rigatoni alla Genovese" }, { duration: 100 })
  })
  .then(() => {
    return Recipe.deleteOne({ title: 'Carrot Cake' })
  })
  .then(() => {
    process.on('SIGINT', () => {
      mongoose.connection.close()
      console.log('connection to database closed')
    })
  })

  .catch(error => {
    console.error('Error connecting to the database', error);
  });
