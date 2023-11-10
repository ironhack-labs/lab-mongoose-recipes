const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://127.0.0.1:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then((x) => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany();
  })
  .then(() => {
    // Iteration 02
    // Recipe.create(data[0]).then((recipe) => console.log(recipe.title));

    //Iteration 03
    return Recipe.insertMany(data).then((recipes) => {
      for (let i = 0; i < recipes.length; i++) {
        console.log(recipes[i].title);
      }
    });
  })
  .catch((error) => {
    console.error('Error connecting to the database', error);
  });

//Iteration 04 - DO NOT WORK
const it4 = Recipe.findOneAndUpdate({ title: 'Rigatoni alla Genovese' }, { duration: 100 }).then((res) =>
  console.log(`Rigatoni alla Genovese has new duration`)
);

//Iteration 05

const it5 = Recipe.deleteOne({ title: 'Carrot Cake' }).then((res) => console.log(`Carrot Cake is no longer available`));

Promise.all([it4, it5]).then((res) => {
  console.log('All done!');
  mongoose.connection.close();
});
