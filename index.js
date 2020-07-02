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
    Recipe.create({ title: "Potatoes", level: "Easy Peasy", cuisine: "english", dishType: "main_course" })
      .then(dbRes => {
        console.log(dbRes.title);
      })
      .catch(dbErr => {
        console.log(dbErr);
        ;
      }).then(() => {
        Recipe.insertMany(data)
          .then(dbRes => {
            dbRes.forEach(recipe => {
              console.log(recipe.title)
            });
          })
          .catch(dbErr => {
            console.log(dbErr);
            ;
          }).then(() => {
            Recipe.updateOne({ title: "Rigatoni alla Genovese" }, { duration: 100 })
              .then(dbRes => {
                console.log("Recipe succesfully updated")
              })
              .catch(dbErr => {
                console.log(dbErr);
              }).then(() => {
                Recipe.deleteOne({ title: "Carrot Cake" })
                  .then(dbRes => {
                    console.log("Recipe succesfully removed")
                  })
                  .catch(dbErr => {
                    console.log(dbErr);
                  }).then(() => {
                    mongoose.connection.close()
                    .then(dbRes => {
                      console.log("Well closed")
                    })
                    .catch(dbErr => {
                      console.log(dbErr);
                    })
                  })
              })
          })
      })
  })

  .catch(error => {
    console.error('Error connecting to the database', error);
  });
