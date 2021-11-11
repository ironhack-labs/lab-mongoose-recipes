const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

const myRecipe = {
  "title": "Brownie",
  "level": "Amateur Chef",
  "ingredients": [
    "1 cup brown sugar",
    "1 cup chocolate",
    "4 eggs",
    "1 1/2 cups white sugar",
    "1 cup vegetable oil",
    "2 teaspoons vanilla extract",
    "1 cup crushed pineapple, drained",
    "3 cups all-purpose flour",
    "1 1/2 teaspoons baking soda",
    "1 teaspoon salt",
  ],
  "cuisine": "International",
  "dishType": "dessert",
  "image": "https://images.media-allrecipes.com/userphotos/720x405/3605684.jpg",
  "duration": 100,
  "creator": "Chef Karla"
}

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
    return Recipe.deleteMany();
  })
  .then( async () => {
    // Run your code here, after you have insured that the connection was made
    const addRecipe = await Recipe.create(myRecipe);
    console.log(addRecipe.title);
    // Create ->> Add many recipes
    const addAllRecipes = await Recipe.insertMany(data);
    addAllRecipes.forEach(item => console.log(item.title));
    //console.log(addAllRecipes);
    // Update -->>
    const query = {title: "Rigatoni alla Genovese"};
    const update = await Recipe.findOneAndUpdate(query, 
      { $set: { duration: 100 }}, 
      { new: true }
    );
    console.log(update);

    // Delete -->>
    const queryToDelete = {title: "Carrot Cake"};
    const remove = await Recipe.deleteOne(queryToDelete);

    // Read -->> find the delete recipe
    const findRemovedRecipe = await Recipe.find({title: "Carrot Cake"});
    console.log(findRemovedRecipe); // --> [] empty array

     // Read -->> what it's inside the mongoDB after update and delete
     //const finalDb = await Recipe.find(); // the same as Recipe.find({});
     const finalDb = await Recipe.find({});
     console.log(finalDb);
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });