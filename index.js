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

  // ITERATION 2 - Create a new recipe
  .then(() => {
    const newRecipe = {
      title: 'Fabada',
      level: 'UltraPro chef',
      ingredients: ['450gr White beans', '250 gr Onion', '2 Garlic gloves', '2 Asturian chorizo', '2 Asturian morcilla', '200gr pork shoulder', '200gr Bacon', '1 Bay leaf', '45gr Extra virgin olive oil'],
      cuisine: 'Asturian',
      dishType: 'main_course',
      image: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.comedera.com%2Ffabada-asturiana%2F&psig=AOvVaw01Wpp1F33VnX4ReJ5SWMko&ust=1700166229439000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCJiKp_PqxoIDFQAAAAAdAAAAABAE',
      duration: 180,
      creator: 'La abuela',
    };

    return Recipe.create(newRecipe);
  })
  .then((createdRecipe) => {
    console.log(`Recipe created: ${createdRecipe.title}`);
  })

  // ITERATION 3 - Insert multiple recipes (imported from json)

  .then(() => {
    return Recipe.create(data);
  })

  // ITERATION 4 - Update recipe

  .then(() => {
    return Recipe.findOneAndUpdate({title: 'Rigatoni alla Genovese'}, {duration: 100});
  })

  // ITERATION 5 - Remove a recipe

  .then(() => {
    return Recipe.deleteOne({title: 'Carrot Cake' });
  })

  // ITERATION 6 - Close the Database

  .then(() => {
    return mongoose.connection.close();
  })

  .then(() => {
    console.log('Connection closed');
  })

  
  .catch(error => {
    console.error('Error connecting to the database', error);
  });

  
