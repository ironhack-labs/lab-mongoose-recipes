const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json' || no te encontraba, bribón...
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false //TEMA DEL DEPRECATED

  })
  .then(self => {

    console.log(`Connected to the database: "${self.connection.name}"`);
    // Before adding any documents to the database, let's delete all previous entries
    return self.connection.dropDatabase();
  })

  .then(() => {
    //ITERATION 2 CREATE RECIPES
    console.log("-----ITERACION 2-----")
    return Recipe
      .create(
        {
          title: "Gambitas de huelva con vainilla y coco",
          level: "Easy Peasy",
          duration: "2",
          ingredients: ['gambas', 'vainilla', 'coco'],
          cuisine: "la cuisine de mi casa"
        }
      )
      .then(newRecipe => console.log('Nueva creación cocineril:', newRecipe.title))
      .catch(err => console.log('Hubo un error', err))
    // Run your code here, after you have insured that the connection was made
  })

  //ITERATION 3 INSERT MULTIPLE RECIPES
  .then(() => {
    console.log("-----ITERACION 3-----")
    return Recipe
      .create(data)
      .then(
        newRecipes => {
          newRecipes.forEach(e => (console.log(e.title)))
        })
  })

  //ITERATION 4 UPDATE RECIPE
  .then(() => {
    console.log("-----ITERACION 4-----")
    return Recipe
      .findOneAndUpdate({ title: 'Rigatoni alla Genovese' }, { duration: 100 }, { new: true })
      .then(
        modifiedRecipe => console.log('Modified:', modifiedRecipe.title, 'with new duration:', modifiedRecipe.duration))
  })

  //ITERATION 5 REMOVE RECIPE
  .then(() => {
    console.log("-----ITERACION 5-----")
    return Recipe
      .findOneAndDelete({ title: 'Carrot Cake' })
      //SACAR TÍTULO?
      .then(success => console.log('Success removal of:', success.title))
  })


  .catch(error => {
    console.error('Error connecting to the database', error);
  });


//ITERATION 6 CLOSE
mongoose.disconnect()
