/* jshint esversion: 9*/
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
    
    // Iteration 2:
    console.log(`Conected to MongoDB`); // insures the connection was made
    mongoose.connection.db.dropDatabase(); // resets the data base
    Recipe.create({
      title: 'Sweet poatato, carrot and pumpkin soup',
      level: 'Amateur Chef',
      ingredients: ['sweet potato', 'carrots', 'pumpkin','"xuxu"', 'french garlic', 'garlic', 'onion', 'olive oil', 'salt', 'pepper'],
      cuisine: 'mediteranian',
      dishType: 'soup',
      image: '',
      duration : 45,
      creator: 'Michel Martinho',
      created: Date.now
    }) // Recipe created
    .then((recipe) => {
      console.log(`The recipe was created and saved as: ${recipe}`) // Recipe creation confirm

      // Iteration 3:
      Recipe.insertMany(data, (error, recipes) => {
        recipes.forEach(dataTitle => {
          console.log(`Created new recipe: ${dataTitle.title}`);
        });
      })
      .then((recipes) => {
        console.log(`The recipes were created and they'r values are: ${recipes}`); // Recipes addition confirmation

        // Iteration 4:
        Recipe.findOneAndUpdate({ title: 'Rigatoni alla Genovese', duration: 100, new: true })
        .then((recipe) => {
          console.log(`The ${recipe} was updated`); // Update confirmation

          // Iteration 5:
          Recipe.deleteOne({ title: 'Carrot Cake' })
          .then((recipe) => {
            console.log(`Removed the recipe: ${recipe}`); // Deletion confirmation

            // Iteration 6:
            mongoose.connection.close(() => {
              console.log('Mongoose conection closed!'); // Closed conection confirmation
            })
            .catch((err) => {console.log(`An error as ocoured: ${err}`);}); // Error on closing conection
          })
          .catch((err) => {console.log(`An error as ocoured: ${err}`);}); // Error on recipe deletion
        })
        .catch((err) => {console.log(`An error as ocoured: ${err}`);}); // Error on updating recipe
      })
      .catch((err) => {console.log(`An error as ocoured: ${err}`);}); // Error on inserting recipes
    })
    .catch((err) => {console.log(`An error as ocoured: ${err}`);}); // Error on creating recipe
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });
