const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// import Recipe from './models/Recipe.model');

// Import of the data from './data.json'
const data = require('./data');
const datasingle = require('./datasingle');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((self) => {
    console.log(`Connected to the database: "${self.connection.name}"`);
    // Before adding any documents to the database, let's delete all previous entries
    return self.connection.dropDatabase();
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made
    Recipe.syncIndexes();

    // iteraction 2 - return error if using data[0] as data
    Recipe.create(datasingle)
      .then((recipe) => {
        console.log('recipe created single:', recipe.title);
      })
      .catch((err) => {
        console.log(err);
      });

    // iteraction 3
    Recipe.insertMany(data)
      .then((recipes) => {
        recipes.forEach((recipe, i) =>
          console.log('created many:', i, recipe.title)
        );
        // iteraction 4
        Recipe.findOneAndUpdate(
          { title: 'Rigatoni alla Genovese' },
          { duration: 100 },
          { useFindAndModify: false }
        )
          .then((changed) => {
            console.log('findOneAndUpdate :', changed.title, changed.duration);
            // iteraction 5
            Recipe.deleteOne({ title: 'Carrot Cake' })
              .then((info) => {
                console.log('deleteOne:', info);
                // iteraction 6
                mongoose.connection.close();
              })
              .catch((err) => {
                console.log(err);
              });
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  })

  .catch((error) => {
    console.error('Error connecting to the database', error);
  });
