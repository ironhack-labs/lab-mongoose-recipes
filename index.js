const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');
const { insertMany } = require('./models/Recipe.model');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

const receta = {
  title: "Pan Tumaca",
  level: "Easy Peasy",
  ingredients: ["Pan tosatado" , "aceite", "tomate", "jamón"],
  cuisine: "Española",
  dishType: "breakfast",
  image: "https://www.bascofinefoods.com/wp-content/uploads/2019/03/pan-tumaca-1.jpg",
  duration: 5,
  creator: "Marek",
  created: 16/07/2022,
};

const newRecipe = new Recipe(receta);
const id = "62d48521ae4e7a7b3ec8e294"
// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then(x => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany();
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made
    return newRecipe
      .save()
      .then((recipe) => {
        console.log("Recipe created 1!")
      })
  })
  .then(() => {
    return Recipe.insertMany(data)
    .then((recipe) => {
      console.log("Recipe created 2!")
    })
  })
  .then(() => {
    return Recipe.findOneAndUpdate({ title: "Rigatoni alla Genovese" }, { $set: { duration: 100 }})
      .then((recipe) => {
        console.log("Recipe modified!")
    })
  }) 
  .then(() => {
    return Recipe.deleteOne({ title: "Carrot Cake" })
      .then((recipe) => {
        console.log("Recipe deleted!")
    })
  })    
  .catch(error => {
    console.error('Error connecting to the database', error);
  });


process.on('SIGINT', () => {
  mongoose.connection.close(() => {
    console.log(`Disconnected from a database`);
    process.exit(0);
  });
});

