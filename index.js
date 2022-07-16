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
    return Recipe.create({
      title: "Japchae",
      level: "Amateur Chef",
      ingredients: [
        "Carrots",
        "Spring onions",
        "Minced Meat",
        "Shitake mushrooms",
        "Sweet potato noodles",
        "Japchae sauce",
        "Neutral oil",
        "Sesame seeds"
      ],
      cuisine: "Asian",
      dishType: "main_course",
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/Korean.food-Chapchae-01.jpg/800px-Korean.food-Chapchae-01.jpg",
      duration: 40,
      creator: "Chef Roms"
    }) 
  })
  .then(() => {
      return Recipe.insertMany(data) 
  })
  .then(recipes => {
  
    recipes.forEach(recipe => {
      console.log(recipe.title)
    })

    return Recipe.findOneAndUpdate({ title: "Rigatoni alla Genovese" }, { duration: 100 }, { new: true })
  })
  .then(recipesUpdated => {
    console.log(recipesUpdated)
    return Recipe.deleteOne({ title: "Carrot Cake" })
  })
  .then((deletedRecipe) => {
    console.log("Success!", deletedRecipe);
  })
  .then(() => {
    mongoose.disconnect()
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });


