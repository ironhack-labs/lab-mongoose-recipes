const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(self => {
    console.log(`Connected to the database: "${self.connection.name}"`);
    // Before adding any documents to the database, let's delete all previous entries
    return self.connection.dropDatabase();
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made
    Recipe.create({
      title:"Tortilla de Patatas",
      level:"Easy Peasy",
      ingredients:["eggs", "potatoes", "onion", "salt", "olive oil"],
      cuisine:"Española",
      dishType:"main_course",
      image:"https://images.media-allrecipes.com/images/75131.jpg",
      duration:35,
      creator: "Isabel Pérez",
     })
     .then(firstRecipe => {
      console.log(`The first recipe is ${firstRecipe.title}`)
      return Recipe.find({})
    })
     .then(() => {
      return Recipe.insertMany(data)
    })
    .then(allRecipes =>{
    return allRecipes.forEach(recipe=>console.log(`The new recipe is:${recipe.title}`))
    })
    .then(() =>{
      return Recipe.updateOne({title:"Rigatoni alla Genovese"},{duration: 100}, console.log(`The recipe is updated`))
    })
    .then(() =>{
      return Recipe.deleteOne({title:"Carrot Cake"}, console.log(`Deleted!`))
    })
    .then(() => {
      return mongoose.connection.close(() => {
        console.log("Connection close!")
      })
    })
   
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });
