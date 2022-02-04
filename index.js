const mongoose = require('mongoose');

const Recipe = require('./models/Recipe.model');

const data = require('./data');

const MONGODB_URI = 'mongodb://127.0.0.1/recipe-app';

mongoose
  .connect(MONGODB_URI)
  .then(x => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    
    return Recipe.deleteMany()
  })
  .then(() => { 
    return Recipe.create(
      {title: 'Croquetas', 
      cuisine: 'Spanish'
      })
      .then((newRecipe) => {console.log(newRecipe.title)})
      .catch(error => {console.log(error)});
    })
  .then(() => {
      return Recipe.insertMany(data)
      .then(allRecipes => {allRecipes.forEach(recipe => {
        console.log(recipe.title)}
      )})
      .catch(error => {console.log(error)})

    })
  .then(() => {
      return Recipe.findOneAndUpdate({title: 'Rigatoni alla Genovese'}, {duration: 100})
        .then(console.log("Now the Rigatoni are properly cooked"))
    })

  .then(() =>{
      return Recipe.deleteOne({title: "Carrot Cake"})
      .then(console.log("Yup, we're out of carrot cake"))
    })
  
  .then(() => {mongoose.connection.close()})
  .catch(error => {
    console.error('Error connecting to the database', error);
  
  })
  ;
