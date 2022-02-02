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
  .then(() => Recipe.syncIndexes())
  .then(() => {
    // Run your code here, after you have insured that the connection was made
    return Recipe
      .create({
        title: 'Pisto con Huevo',
        level: 'Easy Peasy',
        ingredients: ['calabaza, calabacín, tomate, cebolla, ajo, pimientos, huevos'],
        cuisine: 'Manchega',
        dishType: 'main_course',
        image: 'https://www.poesiadefogon.com/wp-content/uploads/2020/04/Pisto-manchego-con-huevo-a-baja-temperatura-1024x768.jpg',
        duration: 20,
        creator: "la Tomasa",
        created: 02 / 02 / 1525

      })
  })
  .then(newRecipe => {
    console.log(`Añadido al libro ${newRecipe.title}`)
    return Recipe
      .create(data)
  })
  .then((response) => {
    response.forEach(response => console.log(response.title))
    return Recipe
      .findOneAndUpdate({ title: "Rigatoni alla Genovese" }, { duration: 100 }, { new: true })
  })

  .then((updated) => {

    console.log(updated)
    return Recipe
      .deleteOne({ title:'Carrot Cake' })
   
  })

  .then(() => mongoose.connection.close())


  .catch(error => {
    console.error('Error connecting to the database', error);
  });
