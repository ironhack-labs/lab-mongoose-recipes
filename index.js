const mongoose = require('mongoose');

// const recipe = model.create('./models')
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
  .then(async () => {

    // Run your code here, after you have insured that the connection was made
    const newRecipe = await Recipe.create({
      title: 'Mafé',
      level: 'UltraPro Chef',
      ingredients: ['riz', 'poulet', 'oignons', 'Tomates', 'dakatine', 'piment', 'arome'],
      cuisine: 'African',
      dishType: 'main_course',
      image: '',
      duration: '3',
      creator: 'Marly',
      created: '08/18/2022',
    });
    const manyRecipes = await Recipe.insertMany(data);
    const recipeToUpdate = await Recipe.findOneAndUpdate({
      title: "Rigatoni alla Genovese"
    }, {
      duration: 100
    })
    const recipeToDelete = await Recipe.deleteOne({
      title: 'Carrot Cake'
    });
    mongoose.connection.close()
  })



  .catch(error => {
    console.error('Error connecting to the database', error);
  });