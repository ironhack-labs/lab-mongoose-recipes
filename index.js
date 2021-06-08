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
    // Before adding any recipes to the database, let's remove all existing ones
   //return Recipe.deleteMany()
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });

//ITERATION 2
  function createRecipe(newRecipe){
    Recipe.create(newRecipe)
    .then(createRecipe => {
      console.log(`A new recipe has been added: ${createRecipe}`)
      mongoose.connection.close();
    })
    .catch(error => console.log('Something went wrong', error))
}

let newRecipe = {
    "title": "Tacos",
    "level": "Easy Peasy",
    "ingredients": [
      "Tortilla",
      "Whatever you wish on your Taco",
      "Napkins",
      "Una coquita bien fría",
    ],
    "cuisine": "Mexican",
    "dishType": "main_course",
    "duration": 40,
    "creator": "Mario Taquero"
  };

  //Uncomment this line to add new recipe
  //createRecipe(newRecipe)

//ITERATION 3
function addMultipleRecipes(data){
  Recipe.insertMany(data)
  .then(manyInserted => {
    console.log(`New recipes have been added: ${manyInserted}`)
    mongoose.connection.close();
  })
  .catch(error => console.log('Something went wrong', error))
}
//This will add the recipes from the data file
//addMultipleRecipes(data);

let newRecipes = [{
  "title": "Tacos",
  "level": "Easy Peasy",
  "ingredients": [
    "Tortilla",
    "Whatever you wish on your Taco",
    "Napkins",
    "Una coquita bien fría",
  ],
  "cuisine": "Mexican",
  "dishType": "main_course",
  "duration": 40,
  "creator": "Mario Taquero"
},{
  "title": "Tacos x2",
  "level": "Easy Peasy",
  "ingredients": [
    "Tortilla",
    "Whatever you wish on your Taco",
    "Napkins",
    "Una coquita bien fría",
  ],
  "cuisine": "Mexican",
  "dishType": "main_course",
  "duration": 40,
  "creator": "Mario Taquero"
}
];

  //Uncomment this line to add new recipes
  //addMultipleRecipes(newRecipes);

//ITERATION 4
function updateOneRecipe(title, update){
  Recipe.findOneAndUpdate({title}, {duration:update}, {new:true})
  .then(oneUpdated => {
    console.log(`The recipe ${oneUpdated} was successfully updated`)
    mongoose.connection.close();
  })
  .catch(error => console.log('Something went wrong', error))
}

// Uncomment to update the data
//updateOneRecipe('Rigatoni alla Genovese', '100');

//ITERATION 5
function removeOneRecipe(title,){
  Recipe.deleteOne({title})
  .then((oneDeleted) => {
    console.log(`A single recipe has been removed: ${oneDeleted}`)
    mongoose.connection.close();
  })
  .catch(error => console.log('Something went wrong', error))
}

//Uncomment this to remove one single recipe
//removeOneRecipe('Carrot Cake');

//ITERATION 6 COMPLETED (ALL CONNECTIONS CLOSE)
