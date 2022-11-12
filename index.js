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
  .then(() => {
    // Iteration 2
    Recipe.create({
      title: "Mojito",
      level: "Easy Peasy",
      ingredients: [
        "1 cup mineral water",
        "60mL white rum",
        "4 Limes - juice only",
        "2 teaspons sugar",
        "A few leaves fresh mint"
      ],
      cuisine: "Cuban",
      dishType: "drink",
      image: "https://cookieandkate.com/images/2020/08/best-mojito-recipe-2.jpg",
      duration: 10,
      creator: "Sir Richard Drake",
      created: "1586"
    })
    .then(recipe => console.log(recipe.title))
    .catch(err => console.log)

    // Iteration 3
    Recipe.insertMany(data)
      .then( result => {
        result.forEach(recipe => {
          console.log(recipe.title)
        })
      })
      .catch(err => console.log)
      .then(() => { // Iteration 4
        Recipe.findOneAndUpdate({title: "Rigatoni alla Genovese"}, {duration: 100})
          .then(result => console.log(`Successfully updated ${result.title}`))
          .catch(err => console.log)
      })
      .then(() => { // Iteration 5
        Recipe.deleteOne({title: "Carrot Cake"})
          .then(() => console.log("Sucessfully deleted Carrot Cake"))
          .catch(err => console.log)
          .then(() => mongoose.connection.close()) // Iteration 6
      })
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  })
