const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');
const Schema = mongoose.Schema;
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

    // Before adding any recipes to the database, let's remove all existing ones
    //return Recipe.deleteMany()
    
  })
  .then(async(req, res) => {
    // Run your code here, after you have insured that the connection was made
    //agregando una nueva receta
    const myNewRecipe = {
      title: "Lemon Pie",
      level: "Amateur Chef",
      ingredients: [
        "1/2 cup light brown sugar",
        "1 large egg",
        "2 Philadelphia Cheese",
        "1 1/4 Marias Cookies",
        "15 lemon slices"
      ],
      cuisine: "French",
      dishType: "dessert",
      image: "https://paydelimon.org/wp-content/uploads/2017/12/10.-relleno-de-lemon-pie.jpg",
      duration: 50,
      creator: "Chef Sinuhe"
    }
    //const recipeCreated = await Recipe.create(myNewRecipe);
    //console.log(recipeCreated.title);
    //agregando todas las recetas a partir del Recipe y obteniendo el data.json

    const allRecipes = await Recipe.insertMany(data)
    
    console.log(allRecipes.title); //no puedo imprimir los titles aun 
    
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });
