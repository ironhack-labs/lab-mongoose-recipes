const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';
// const recip = {
//   title: "Boeuf Bourguignon",
//   level: "Amateur Chef",
//   ingredients: ["boeuf", "vin"],
//   cuisine: "sorry ?",
//   dishType: "main_course",
//   image: "https://odelices.ouest-france.fr/images/recettes/boeuf-bourguignon.jpg",
//   duration: 240,
//   creator: "jean Bourguignon",
//   created: "1975-06-22"
// }
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
    // Recipe.create(recip, (error, recipe) => {
    //   if (error) {
    //     console.log("an error happened:", error);
    //     return;
    //   }
    //   console.log("The new recipe is saved:", recipe);
    // })
    Recipe.insertMany(data)
    .then(recipe => console.log("Here are your new recipes!:", recipe))
    .catch(error => console.log("Oups, something wrong happened:", error));
    Recipe.findOneAndUpdate({title:'Rigatoni alla Genovese'}, {duration: 100})
    .then(recipe => console.log("here's your update", recipe.duration))
    .catch(error => console.log("Oups:", error));
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });
  console.log(Recipe);