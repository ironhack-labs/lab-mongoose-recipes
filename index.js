const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data.json');

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
    // Run your code here, after you have insured that the connection was made
    const newRecipe = {
      title: "Instant Maggie",
      level: "Easy Peasy",
      ingredients: ["Maggie Packet", "Water", "Vegetable", "Butter", "Eggs"],
      cuisine: "Indian Snack",
      dishType: "snack",
      image: 'https://cdn.myshoptet.com/usr/www.swagat.cz/user/shop/big/3011-2_maggi-masala-noodles-70g.jpg?64a41e38',
      duration: 15,
      creator: "Random Person",
    }
    return Recipe.create(newRecipe);
  })
  .then((dataFromDB) => {
    console.log(dataFromDB.title);
    Recipe.insertMany(data)
  })

  .then(()=> {
    return Recipe.findOneAndUpdate(
      {title:"Rigatoni alla Genovese"}, 
      {duration: 100})
  })
  .then(()=> {
    console.log('Recipe is updated!')
  })
  .then(()=>{
    return Recipe.deleteOne(
      {title: "Carrot Cake"}
    )
  })
  .then((deletedRecipe)=> {
    console.log("Recipe is deleted", deletedRecipe)
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  })
  .then(()=>{
    mongoose.connection.close();
    console.log('connection closed')
  })
