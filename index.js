const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe');
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
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made
    createRecipe(newRecipe);
    createManyRecipes(manyRecipes);
    setTimeout(function() { updateRecipe("Chilaquiles","Chilaquiles Rojos"); }, 5000);
    setTimeout(function() { removeRecipe("Chilaquiles Rojos"); }, 10000);
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
});

//Create recipe
function createRecipe(data){
  Recipe.create(data)
  .then(createdRecipe => console.log(`Se creo una receta: ${createdRecipe}`))
  .catch(error=>console.log("createRecipe error ",error))
};

//Create many recipes
function createManyRecipes(data){
  Recipe.insertMany(data)
  .then(createdRecipes => console.log(`Se crearon las recetas: ${createdRecipes}`))
  .catch(error=>console.log("createManyRecipes error ",error))
};

//Update recipe 
function updateRecipe(title, newTitle){
  Recipe.findOneAndUpdate({title},{title:newTitle})
  .then(recipe => console.log(`Se actualizo la receta: ${recipe}`))
  .catch(error=>console.log("updateRecipe error ",error))
};

//Remove recipe 
function removeRecipe(title){
  Recipe.deleteOne({title})
  .then(() => {
    console.log(`Se elimino la receta: ${title}`);
    //Close DB
    mongoose.connection.close();
  })
  .catch(error=>console.log("updateRecipe error ",error))
};

let newRecipe = {
  title:"Chilaquiles",
  level:"Easy Peasy",
  ingredients: ['tortilla','queso','chile','tomate','cebolla','pollo','cilantro'],
  cuisine:"Mexicana",
  dishType:"main_course",
  duration: 20,
  creator: "Andres"
};

let manyRecipes = [
  {
    title:"Receta1",
    level:"Easy Peasy",
    ingredients: ['ingrediente1','ingrediente2','ingrediente3'],
    cuisine:"Mexicana",
    dishType:"breakfast",
    duration: 10,
    creator: "Roberto"
  },
  {
    title:"Receta2",
    level:"Amateur Chef",
    ingredients: ['ingrediente1','ingrediente2','ingrediente3'],
    cuisine:"Italiana",
    dishType:"main_course",
    duration: 20,
    creator: "Osuna"
  },
  {
    title:"Receta3",
    level:"UltraPro Chef",
    ingredients: ['ingrediente1','ingrediente2','ingrediente3'],
    cuisine:"Asiatica",
    dishType:"soup",
    duration: 30,
    creator: "Gonzalez"
  }
];
