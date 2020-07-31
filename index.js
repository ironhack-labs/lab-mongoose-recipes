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
    Recipe.create(
      { title: 'Derf Burger', 
      level: "Amateur Chef", 
      ingredients: [
        "Beef",
        "Bacon",
        "Sausage",
        "Ham",
        "Cheese",
        "Bread,",
        "Onion",
        "Tomato",
        "Wisky",
        "Beer",
        "Salt",
        "Spicy"
      ], 
      cuisine:"Portuguese", 
      dishType:"main_course", 
      duration:60, 
      creator:"Daniel David Silva" 
    }
  )
      .then(myRecipe => console.log(`Recipe created: `, myRecipe.title))
      .catch(error =>
        console.log(`Creating a new recipe went wrong! Try again 😞 ${error}`)
      );

// Insert Multiple Recipes
.then(() => Recipe.insertMany(data))

// Update Recipe
.then(() =>
     Recipe.findOneAndUpdate(
       { title: "Rigatoni alla Genovese" },
       { duration: 100 },
       { new: true }
     )
   )
   .then((recipe) => console.log("The recipe update succesfully!", recipe))

// Remove a recipe
.then(() => Recipe.deleteOne({ title: "Carrot Cake" }))
.then(console.log("Oh oh! The Carrot Cake is no longer available."))

// Close the Database
.then(() => mongoose.connection.close())
.then(console.log("The DB it's disconnected."))

.catch(error => {
  console.error('Error connecting to the database', error);
  });
