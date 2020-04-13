const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

// Creating one Recipe
const recipeMine = { title: 'Margarida Recipe', level: 'Easy Peasy', ingredients: ['tomato'], cuisine: 'Margarida', dishType: 'breakfast', duration: 1000, creator: 'Margarida' };


const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  })
  .then(self => {
    console.log(`Connected to the database: "${self.connection.name}"`);
    // Before adding any documents to the database, let's delete all previous entries
    return self.connection.dropDatabase();
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  })
  .then(() => {

    // Run your code here, after you have insured that the connection was made

    Recipe.create(recipeMine).then(recipeMine => {

      console.log(`Print the gaddam ${recipeMine.title}`);

    })

      .then(() => {

        Recipe.insertMany(data).then(recipe => {

          data.forEach(recipe => console.log(`${recipe.title}`));

        })

          .then(() => {

            Recipe.findOneAndUpdate({ title: 'Rigatoni alla Genovese' }, { duration: 100 }).then(recipe => {

              console.log(`Updated this recipe ${recipe}`);

            })

              .then(() => {

                Recipe.deleteOne({ title: "Carrot Cake" }).then(recipe => {

                  console.log(`Deleted this recipe ${recipe}`);

                }).then(() => {

                  mongoose.connection.close(() => {

                    console.log("mongoose was closed");

                  });
                  
                })

              })
          })
      })
  })


  .catch(error => {
    console.error('Error connecting to the database', error);
  });


