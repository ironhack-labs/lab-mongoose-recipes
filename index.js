const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Make Mongoose use `findOneAndUpdate()`. Note that this option is `true`
// by default, you need to set it to false.
mongoose.set('useFindAndModify', false);

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
    const cannelloni = {
      title: 'Cannelloni ricotta e spinaci',
      level: 'Amateur Chef',
      cuisine: 'Italian',
      ingredients: [
        'pasta',
        'ricotta cheese',
        'spinaches',
        'butter',
        'flour'
      ],
      dishType: 'main_course',
      duration: 180,
      creator: 'Stefano'
    };

    // First adds the custom recipe ('cannelloni')
    Recipe.create(cannelloni)
      .then(recipe => {
        console.log(`A recipe was created. Its title is: ${recipe.title}`);
      })
      .then(() => {
        // Only after the custom recipe has been added, it adds the recipes from data.json file
        Recipe.insertMany(data)
          .then(recipes => {
            recipes.forEach(recipe => {
              console.log(`These recipes were added: ${recipe.title}`);
            });
          })
          .then(() => {
            // Only after having added those, it updates one of the recipes
            const query = {
              title: 'Rigatoni alla Genovese'
            };

            Recipe.findOneAndUpdate(query, {
                $set: {
                  duration: 100
                }
              })
              // I don't know why, but if I console log here the recipe duration, it will still show 220 instead of 100. If I check the recipe in Compass, however, the duration has been successfully update.
              .then((recipe) => {
                console.log(`I updated the 'Rigatoni alla Genovese' recipe. Its duration is now: ${recipe.duration}`);
              })
              .then(() => {
                //Only after having updated the recipe, it deletes the Carrot Cake
                const recipeToDelete = {title: 'Carrot Cake'};
                Recipe.deleteOne(recipeToDelete)
                  .then(() => {
                    console.log(`I deleted the Carrot Cake`);
                  })
                  .then(() => {
                    // Only after having deleted the Carrot Cake, it closes the connection with the database
                    mongoose.connection.close(() => {
                      console.log('Mongoose default connection disconnected through app terminal');
                    });
                  })
                  .catch(error => {
                    console.log(`An error was encountered while trying to delete the recipe: ${error}`);
                  });
              })
              .catch(err => {
                console.log(`An error occurred while updating the recipe information: ${err}`);
              });
          })
          .catch(err => {
            console.log(`An error occurred while importing the recipe data: ${err}`);
          });
      })
      .catch(err => {
        console.log(`An error occurred while creating the recipe: ${err}`);
      });
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });