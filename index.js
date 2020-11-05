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
    Recipe.create(recipeObj)
.then((results) => console.log(`Saved new recipe: ${results.title}`))
.catch((saveErr) => console.log(`Save failed: ${saveErr}`)),

Recipe.insertMany(data)
.then((results) => console.log(`Saved new recipes: ${results.values.title}`))
.catch((saveErr) => console.log(`Save failed: ${saveErr}`)),

Recipe.findOneAndUpdate({title: "Rigatoni alla Genovese"}, {duration: 100})
.then((results) => console.log(`Updated recipe`))
.catch((saveErr) => console.error(`Update failed: ${saveErr}`)),

Recipe.deleteOne({title: 'Carrot Cake'})
.then((results) => console.log("Recipe is deleted"))
.catch((saveErr) => console.log ("Delete failed"));


  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });

//Iteration 2: add a new recipe
const recipeObj = {
  title: "Sweet potato soup",
  level: "Easy Peasy",
  ingredients:["Sweet potato", "Carrots", "Red Onions", "Paprika", "Garlic", "Parsly", "Cayenne", "Vegetable Stock", "Water"],
  cuisine: "Sophie's cuisine",
  dishType: "soup",
  duration: 20,
  creator: "Sophie",
}



process.on("SIGINT", () => {
  mongoose.connection.close(() => {
    console.log(`Mongo connection disconnected`);
    process.exit(0);
  });
}); 