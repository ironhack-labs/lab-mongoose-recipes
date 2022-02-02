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
  .then(() => {
    Recipe
    // .create(
    //   {
    //     title: `tortitas`,
    //     level: `Easy Peasy`,
    //     ingredients: [`harina`, `huevos`, `azucar`, `motherfuckers`],
    //     cuisine: `tipical my casa`,
    //     dishType: `breakfast`,
    //     durantion: 30,
    //     creator: `Gsus`,
    //     created: ``,
    //   })

    // })
    //.then(theNewRecipe => console.log(`la nueva super receta ${theNewRecipe.title}`))
    //.create(data)
    // .then(theNewRecipe => theNewRecipe.forEach(elm => console.log(`la nueva super receta ${elm.title}`)))

    //Recipe.findOneAndUpdate({title:`Rigatoni alla Genovese`},{duration:100})
    Recipe
      .findOneAndDelete({ title: 'Carrot Cake' })
      .then(() =>
        mongoose.connection.close())
        
      .catch(error => { console.error('Error connecting to the database', error) })
  });
