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

    // --- iteration 2 ---
    Recipe
      .create({
        title: "milkshake",
        level: "Easy Peasy",
        ingredients: ['4 large scoops (about 1 1/2 c.) vanilla ice cream', '1/4 c. milk', 'Whipped topping, for garnish', 'Sprinkles, for garnish', 'Maraschino cherry, for garnish'],
        duration: 5,
      })
      .then((dbRes) => {
        console.log(dbRes)
      })
      .catch((dbErr) => {
        console.log(dbErr)
      })

    // --- iteration 3 ---
    Recipe
      .insertMany(data)
      .then((dbres) => {
        console.log(dbres.forEach.title)
        // --- iteration 4 ---
        Recipe
          .findOneAndUpdate({
            title: 'Rigatoni alla Genovese'
          }, {
            duration: 100
          }, {
            new: true
          })
          .then((dbRes) => {
            console.log(dbRes)
            // --- iteration 5 ---
            Recipe
              .findOneAndDelete({
                title: 'Carrot Cake'
              })
              .then((dbres) => {
                console.log(dbres)
                // --- iteration 6 ---
                mongoose
                  .connection.close()
              })
              .catch((dberr) => {
                console.log(dberr)
              })
          })
          .catch((dbErr) => {
            console.log(dbErr)
          })
      })
      .catch((dbErr) => {
        console.log(dbErr)
      })






  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });