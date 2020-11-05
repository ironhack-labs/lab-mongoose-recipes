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
  // .then(self => {
  //   console.log(`Connected to the database: "${self.connection.name}"`);
  //   // Before adding any documents to the database, let's delete all previous entries
  //   return self.connection.dropDatabase();
  // })
  .then(() => {
  // Run your code here, after you have insured that the connection was made

  // ITERATION 2 - Insert new recipe

  // const newRecipe = {
  //   title: "Tortilla de Patata",
  //   level: "Easy Peasy",
  //   ingredients: ["potatoes", "onion", "eggs", "olive oil"],
  //   cuisine: "Mediterranean",
  //   dishType: "main_course",
  //   image: "https://www.recetasderechupete.com/wp-content/uploads/2016/08/Tortilla-de-patatas-525x360.jpg",
  //   duration: 90,
  //   creator: "Irene",
  //   created: "05-11-2020"
  // };

  // Recipe.create(newRecipe)
  // .then((results) => console.log(`Saved new recipe: ${results}`))
  // .catch((saveErr) => console.error(`Save failed: ${saveErr}`));

  // ITERATION 3 - insert all from json

  // Recipe.insertMany(data)
  // .then((results) => console.log(`Saved new recipes: ${results}`))
  // .catch((saveErr) => console.error(`Save failed: ${saveErr}`));

  // ITERATION 4 - Update One

    Recipe.updateOne(
      { title: "Rigatoni alla Genovese" }, { duration: 100 }, 
      { new: true })
      .then((results) => console.log(`Updated ${results}`))

  // ITERATION 5 - Delete One
    
    Recipe.deleteOne({ title: "Carrot Cake" })
    .then(() => console.log(`Successfully removed Carrot Cake!`))
    .catch((error) => console.error(error));
  })
  
  .catch(error => {
    console.error('Error connecting to the database', error);
  });

  // ITERATION 6 - Disconnect
 
process.on("SIGINT", () => {
  mongoose.connection.close(() => {
    console.log(`Mongo connection disconnected`);
    process.exit(0);
  });
});