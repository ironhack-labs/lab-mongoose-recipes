const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

const customRecipe = {
  title: "Arròs a la cassola",
  level: "Easy Peasy",
  ingredients: ["1 red bell pepper", "2 green red bell peppers", "1 onion", "3 cloves of garlic", "250gr tomato", "1L vegetable broth", "200gr rice", "Salt", "Pepper", "Parsley"],
  cuisine: "Catalana",
  duration: 120,
  creator: "Joana Bautista"
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
    // Before adding any documents to the database, let's delete all previous entries
    return self.connection.dropDatabase();
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made
    Recipe.create(customRecipe)
    .then(() => console.log(`My recipe is ${customRecipe.title}.`))
  })
  .then(() => {
    Recipe.insertMany(data)
    .then(recipes => recipes.forEach(el => console.log(`${el.title}`)))
    .then(() => {
      Recipe.findOneAndUpdate({ title: 'Rigatoni alla Genovese' }, { $set: { duration: 100 }})
      .then(() => console.log(`The "Rigatoni alla Genovese" recipe has been updated successfully.`))
    })
    .then(() => {
      Recipe.deleteOne({title: "Carrot Cake"})
      .then(() => {
        console.log(`The "Carrot Cake" recipe has been deleted successfully.`)
        mongoose.connection.close(() => console.log("Closing connection with mongoose..."))
      })
    })
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });