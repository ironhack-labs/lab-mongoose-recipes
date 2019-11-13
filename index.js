const mongoose = require('mongoose');
const Recipe = require('./models/Recipe'); // Import of the model Recipe from './models/Recipe'
const data = require('./data.js'); // Import of the data from './data.js'



// Connection to the database "recipeApp"
mongoose.connect('mongodb://localhost/recipeApp', {
    useNewUrlParser: true
  })
  .then(() => {
    console.log('Connected to Mongo!');
  }).catch(err => {
    console.error('Error connecting to mongo', err);
  });


Recipe.collection.drop()
Recipe.create({
    title: "Gazpacho Loco",
    level: "Easy Peasy",
    ingredients: ["tomato", "cucumber", "popino", "salt", "sugar", "olive"],
    cuisine: "antartic",
    dishType: "Snack",
    image: 'https://images.media-allrecipes.com/userphotos/720x405/815964.jpg',
    duration: 360,
    creator: "Chef Zarza",
  })
  .then(newRecipe => console.log(`se agrego ${newRecipe.title}`))
  .then(() => Recipe.insertMany(data))
  .then((allRecipes => allRecipes.forEach(elm => console.log(elm.title))))
  .then(() => Recipe.updateOne({
    title: "Rigatoni alla Genovese"
  }, {
    duration: 100
  }))
  .then(() => Recipe.deleteOne({
    title: "Carrot Cake"
  }))
  .then(Recipe => console.log("Se eliminó correctamente"))
  .catch(err => console.error('Error por no saber', err));

  
mongoose.connection.on('error', (err) => console.log(`Mongoose default connection error: ${err}`));
mongoose.connection.on('disconnected', () => console.log('Mongoose default connection disconnected'));
process.on('SIGINT', () => {
  mongoose.connection.close(() => {
    console.log('Mongoose default connection disconnected through app termination');
    process.exit(0);
  });
});