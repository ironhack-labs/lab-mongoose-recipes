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
    // return Recipe.deleteMany()
  })
  .then(() => Recipe.syncIndexes())
// .then(() => {
// Run your code here, after you have insured that the connection was made
console.log('reina')
Recipe.create([
  { title: 'Lasaña', level: 'Amateur Chef', ingredients: ['Carne', 'cebolla', 'zanahoria', 'queso'], cuisine: 'Italiana', dishType: 'main_course', duration: 30, creator: 'Jud' },
])
  .then((myRecipe) => {
    console.log(myRecipe)
    return Recipe.insertMany(data)
  })

  .then((allRecipes) => {
    allRecipes.forEach(elm => console.log(`${elm.title}`))
    return Recipe.findOneAndUpdate({ title: 'Rigatoni alla Genovese' }, { duration: 100 }, { new: true })
  })
  .then((udpateRecipe) => {
    console.log('receta actualizada')
    return Recipe.deleteOne({ title: 'Carrot Cake' })
  })

  .then((deletedReciped) => console.log('receta eliminada'))
  .catch(error => {
    console.error('Error connecting to the database', error);
  })
mongoose.disconnect()