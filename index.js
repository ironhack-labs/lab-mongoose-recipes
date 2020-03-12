const mongoose = require('mongoose');
const Recipe = require('./models/Recipe.model'); // Import of the model Recipe from './models/Recipe.model.js'
const data = require('./data.js'); // Import of the data from './data.js'

// Connection to the database "recipeApp"
mongoose
  .connect('mongodb://localhost/recipe-app-dev', {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(x => console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`))
  .catch(err => console.error('Error connecting to mongo', err));

Recipe
  .create({
    title: "Falafel",
    level: "Amateur Chef",
    ingredients: ["chickpeas", "herbs"],
    cuisine: "Middle Eastern",
    dishType: "Snack",
    duration: 20,
    creater: "Fabio & Yvana",
  })
  .then((recipe) =>{
    console.log("Recipe created");
  })
  .catch((error) =>{
    console.log("error: ", error);
  })  


Recipe
  .insertMany(data)
  .then((recipes) =>{
    console.log("recipes");
  })
  .catch((error) =>{
    console.log("error: ", error);
  })

Recipe.findOneAndUpdate({title: "Rigatoni alla Genovese"}, {duration: 100})
  .then((recipe) =>{
    console.log("recipe updated");
  })
  .catch((error) =>{
    console.log("error: ", error);
  })

Recipe
  .deleteOne({title: "Carrot Cake"})
  .then((recipe) =>{
    console.log("recipe removed");
  })
  .catch((error) =>{
    console.log("error: ", error);
  })

mongoose.connection.close(() => {
  console.log('Mongoose disconnected');
  process.exit(0);
  });