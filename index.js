const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

let myRecipe = {
  title: "Tanvi's Pulao",
  level: "Easy Peasy",
  ingredients: [
    "1/2 Kg rice",
    "1 bowl fresh green peas",
    "1 tablespoon salt",
    "2 tablespoons vegetable oil",
    "2 red chillies",
    "2 teaspoons ground cumin",
    "1 teaspoon ghee",
    "2 carrots"
  ],
  cuisine: "Indian",
  dishType: "main_course",
  image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5O61QbkwbgbgBlDGRW3cQrDn9Yrx1eYv2Eg&usqp=CAU",
  duration: "25",
  creator: "Tanvi",
}

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
   await Recipe.create(myRecipe)
    .then((recipe) => console.log(`${recipe.title}`))
    .catch(error => console.log('An error happened while creating a new recipe:', error));
  })

  .then(async () => {
    await Recipe.insertMany(data)
      .then(list => {
        list.forEach(recipe => console.log(recipe.title))
      })
      .catch(error => console.log(error))
  })

  .then(async () => {
    await Recipe.findOneAndUpdate({
      title: "Rigatoni alla Genovese",
    },
      {
        duration: 100,
      })
      .then(() => console.log("Success updating! :)"))
      .catch(error => console.log(error))
  })

  .then(async () => {
    await Recipe.deleteOne({
      title: "Carrot Cake",
    })
      .then(() => console.log("Carrot Cake deleted"))
      .catch(error => console.log(error))
  })

 /* .then(async () => {
    await mongoose.disconnect(MONGODB_URI)
      .then(console.log(`"Disconnected from database!", {${mongoose.connection.readyState}}`))
      .catch((error) =>
        console.log("An error happened while disconnecting:", error)
      );
  }) */

  .catch(error => {
    console.error('Error connecting to the database', error);
  });


