const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');


const MONGO_URI = process.env.MONGODB_URI || 'mongodb+srv://new-user:L8UdoHR7cWloApya@cluster0.0yglzcg.mongodb.net/lab-mongoose-recipes'

mongoose
  .connect(MONGO_URI)
  // .then(x => {
  //   console.log(`Connected to the database: "${x.connection.name}"`);
  //   // Before adding any recipes to the database, let's remove all existing ones
  //   return Recipe.deleteMany()
  // })
  .then(() => {
    // Run your code here, after you have insured that the connection was made
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });

const newRecipe = {
  title: "Asian Glazed Chicken Thighs",
  level: "Amateur Chef",
  ingredients: [
    "1/2 cup rice vinegar",
    "5 tablespoons honey",
    "1/3 cup soy sauce (such as Silver Swan®)",
    "1/4 cup Asian (toasted) sesame oil",
    "3 tablespoons Asian chili garlic sauce",
    "3 tablespoons minced garlic",
    "salt to taste",
    "8 skinless, boneless chicken thighs"
  ],
  cuisine: "Asian",
  dishType: "Dish",
  image: "https://images.media-allrecipes.com/userphotos/720x405/815964.jpg",
  duration: 40,
  creator: "Chef LePapu"
}


Recipe.create(newRecipe)
  .then(result => console.log(result.title))
  .catch(err => console.log(err))

const manyNewRecipe = data
// Recipe.insertMany(manyNewRecipe)
//   .then(Recipe.find({})
//     .then(result => console.log(result.title))
//     .catch(err => console.log(err)))
//   .catch(err => console.log(err))

Recipe.insertMany(manyNewRecipe)
  .then(result => {
    result.forEach(oneRecipe => oneRecipe.title)
  })
  .catch(err => console.log(err))

Recipe.findOneAndUpdate({ title: 'Rigatoni alla Genovese' }, { $inc: { duration: 100 } })
  .then(() => { console.log('You changed the duration!') })
  .catch(err => console.log(err))

Recipe.deleteOne({ title: 'Carrot Cake' })
  .then(() => { console.log('You deleted the recipe!') })
  .catch(err => console.log(err))

mongoose.connection.close()
  .then(() => { console.log('The connection is closed!') })
  .catch(err => console.log(err))
