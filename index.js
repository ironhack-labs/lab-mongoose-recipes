const mongoose = require('mongoose');
const recipes = require("./data.json");

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
  .then((data) => {
    // Run your code here, after you have insured that the connection was made
    Recipe.create({
      title: 'Delicious Spaghetti Carbonara',
      level: "Amateur Chef",
      ingredients: ['200g spaghetti', '100g pancetta', '2 large eggs', '50g Pecorino cheese', 'Salt and black pepper to taste'],
      cuisine: "Italian",
      dishType: "main_course",
      image: "https://images.media-allrecipes.com/images/75131.jpg",
      duration: 30,
      creator: "Chef Julia",
      created: Date.now()
    })
      .then(() => {
      })
      .catch((err) => console.log(err))

    Recipe.create(recipes)
      .then(() => {

      })
      .catch((err) => console.log(err))

    Recipe.findOneAndUpdate({ title: "Rigatoni alla Genovese" }, { duration: 100 }, { new: true })
      .then(() => {
        //Entra en este then pero no devuelve la query actualizada
        console.log("updated")
      })
      .catch((err) => console.log(err))

    Recipe.deleteOne({ title: 'Carrot Cake' })
      .then(() => {
      })
      .catch((err) => console.log(err))
  })

  .catch(error => {
    console.error('Error connecting to the database', error);
  });

  /*return Recipe.create({
    title: 'Delicious Spaghetti Carbonara',
    level: "Amateur Chef",
    ingredients: ['200g spaghetti', '100g pancetta', '2 large eggs', '50g Pecorino cheese', 'Salt and black pepper to taste'],
    cuisine: "Italian",
    dishType: "main_course",
    image: "https://images.media-allrecipes.com/images/75131.jpg",
    duration: 30,
    creator: "Chef Julia",
    created: Date.now()
  })
  .then(() => {
    return Recipe.create(recipes)
  })
  .then(() => {
    return Recipe.findOneAndUpdate({ title: "Rigatoni alla Genovese" }, { duration: 100 }, { new: true })
  })
  .then(() => {
    Recipe.deleteOne({ title: 'Carrot Cake' })
  })
  .then(() => {
    mongoose.connection.close();
  })
  .catch((error) => {
    console.error('Error connecting to the database', error);
  })*/