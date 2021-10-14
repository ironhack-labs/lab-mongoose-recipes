const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(self => {
    console.log(`Connected to the database: "${self.connection.name}"`);

    // const newRecipe = {
    //   title: 'Cacio e pepe',
    //   level: 'Amateur Chef',
    //   ingredients: ['spaghetti', 'butter', 'pepper', 'pecorino cheese', 'salt' ],
    //   cuisine: 'italian',
    //   dishType: 'main_course',
    //   image: 'https://www.giallozafferano.com/images/228-22822/Spaghetti-Cacio-e-Pepe-Pecorino-and-black-pepper-spaghetti_1200x800.jpg',
    //   duration: 20,
    //   creator: 'Dominika',
    // }
    // console.log(newRecipe.title)
    // return Recipe.create(newRecipe);
    // //Before adding any recipes to the database, let's remove all existing ones

    // return Recipe.deleteMany()
  })
  .then(() => {
  //   return Recipe.insertMany(data)
  })
  .then(() => {
    return Recipe.findOneAndUpdate({title: 'Rigatoni alla Genovese'}, {duration: 100})
  })
  .then(() => {
    console.log(`Hurray! Duration updated!`)
  })
  .then(() => {
    return Recipe.deleteOne({name: 'Carrot Cake'})
  })
  .then(() => {
    console.log('Carrot cake successfully removed :(')
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });
