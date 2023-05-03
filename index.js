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

  .then(() => {
    return Recipe.create({
      title: "Misoshiro",
      level: "Amateur Chef",
      ingredients: [
        "1 pacotillo de misoshiro",
        "agua hirviendo",
        "cubitos de tofu",
      ],
      cuisine: "Asian",
      dishType: "soup",
      duration: 10,
      creator: "Maggi"
    })
      .then(newRecipe => console.log("el titulo es ", newRecipe.title))
  })

  .then(() => {
    return Recipe.insertMany(data)
      .then(arrayRecipes => arrayRecipes.forEach(recipe => console.log("el titulo es ", recipe.title)))
  })

  .then(() => {
    return Recipe.findOneAndUpdate({ title: 'Rigatoni alla Genovese' }, { duration: 100 })
      .then(console.log("success! You've updated the product!"))
  })

  .then(() => {
    return Recipe.deleteOne({ title: 'Carrot Cake' })
      .then(console.log('success! Everyone ate the cake and you deleted the product'))
  })
  .then(() => {
    mongoose.connection.close()
      .then(console.log('closed connection'))
  })



  .catch(error => {
    console.error('Error connecting to the database', error);
  });
