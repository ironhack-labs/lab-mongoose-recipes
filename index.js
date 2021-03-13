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
    useUnifiedTopology: true,
  })
  .then((self) => {
    console.log(`Connected to the database: "${self.connection.name}"`);
    // Before adding any documents to the database, let's delete all previous entries
    return self.connection.dropDatabase();
  })
  .then(() => {
    // Iteration 2
    const newRecipe = {
      title: 'Popcorn',
      level: 'Easy Peasy',
      ingredients: ['oil', 'salt', 'pop corn'],
      cuisine: 'Global',
      dishType: 'snack',
      duration: 15,
      creator: 'Unknown',
    };
    Recipe.create(newRecipe)
      .then((value) => {
        console.log('New Recipe created: ', value.title);

        // Iteration 3
        Recipe.insertMany(data)
          .then((val) => {
            val.forEach((element) =>
              console.log('New Recipe created: ', element.title)
            );

            // Iteration 4
            Recipe.findOneAndUpdate(
              { title: 'Rigatoni alla Genovese' },
              { duration: 100 }
            )
              .then((v) => {
                console.log(v.title, ' recipe successfully updated');

                // Iteration 5
                Recipe.deleteOne({ title: 'Carrot Cake' })
                  .then(() => {
                    console.log('Carrot Cake recipe successfully deleted');

                    // Iteration 6
                    mongoose.disconnect();
                  })
                  .catch((deleteError) => {
                    console.log('Deletion error ==> ', deleteError);
                    mongoose.disconnect();
                  });
              })
              .catch((e) => {
                console.log('Error updating recipe ==> ', e);
              });
          })
          .catch((err) => {
            console.log('Error adding array of recipes ==> ', err);
          });
      })
      .catch((error) => console.log('Error creating recipe ==> ', error));
  })

  .catch((error) => {
    console.error('Error connecting to the database', error);
  });
