const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://127.0.0.1:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then((x) => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany();
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made
    Recipe.create({
      title: 'Fish and Cheese',
      level: 'Easy Peasy',
      cuisine: 'Brazilian/Bulgarian',
      dishType: 'main_course',
      duration: 30,
      creator: 'Fernanda and Vanya',
    })
      .then((recipe) => console.log(recipe.title))
      .catch(console.error);

    Recipe.insertMany(data)
      .then(
        data.forEach((recipe) => {
          console.log(recipe.title);
        }),
      )
      .then(() => {
        Recipe.findOneAndUpdate(
          { title: 'Rigatoni alla Genovese' },
          { duration: 100 },
        ).then(() => {
          console.log('duration updated');
        });
      })
      .then(() => {
        Recipe.deleteOne({ title: 'Carrot Cake' })
          .then(() => {
            console.log('recipe removed');
          })
          .then(() => {
            mongoose.connection.close();
          });
      });
  })

  .catch((error) => {
    console.error('Error connecting to the database', error);
  });
