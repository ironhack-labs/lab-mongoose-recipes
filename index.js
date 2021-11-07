const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

// set the url for the mongo database, and the new database named--> recipe-app
// if the db doesn't exist, it's going to create one with tne name --> recipe-app
const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// my own recipe to use in--> Recipe.create()
const myRecipe = {
  "title": "Brownie",
  "level": "Amateur Chef",
  "ingredients": [
    "1 cup brown sugar",
    "4 eggs",
    "1 1/2 cups white sugar",
    "1 cup vegetable oil",
    "1 cup chocolate",
    "3 cups all-purpose flour",
    "1 1/2 teaspoons baking soda",
    "1 teaspoon salt",
    "1/2 cup butter",
  ],
  "cuisine": "International",
  "dishType": "dessert",
  "image": "https://images.media-allrecipes.com/userphotos/720x405/3605684.jpg",
  "duration": 90,
  "creator": "Karla"
}

const myRecipe1 = {
  "title": "Chocolate birthday party",
  "level": "Amateur Chef",
  "ingredients": [
    "1 cup brown sugar",
    "4 eggs",
    "1 1/2 cups white sugar",
    "1 cup vegetable oil",
    "1 cup chocolate",
    "3 cups all-purpose flour",
    "1 1/2 teaspoons baking soda",
    "1 teaspoon salt",
    "1/2 cup butter",
  ],
  "cuisine": "International",
  "dishType": "dessert",
  "image": "https://images.media-allrecipes.com/userphotos/720x405/3605684.jpg",
  "duration": 180,
  "creator": "Amy"
}

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then( self => {
    console.log(`Connected to the database: "${self.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany();
  })
  .then( async connection => {
    // Run your code here, after you have insured that the connection was made
    // Create a recipe
    // Recipe.create(myRecipe)
    //   .then(recipe => console.log(`My first recipe: ${recipe.title}`))
    // Create a recipe
     const addRecipe = await Recipe.create(myRecipe1);
     console.log(addRecipe); 
     // Insert Many
     const manyRecipes = await Recipe.insertMany(data);
     manyRecipes.forEach((item, index) => console.log(`${item.title}`));

     // findOneAndUpdate
     const query = {title: "Rigatoni alla Genovese"};
     // return the new thing that it’s updated, the new instance, this is the third argument
     const update = await Recipe.updateOne(query, {$set: { duration: 100 }}, {new: true});
     //console.log(update);
     console.log(`Well done! You've just update the duration of the ${update.title} to ${update.duration} minutes`);
    
     // delete one
     const queryToDelete = {title: "Carrot Cake"}
     const remove = await Recipe.deleteOne(queryToDelete); //returns {deletedCount: 1}
     console.log(`You've removed a recipe!`);

     // close the connection with the database
     mongoose.connection.close();
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });
