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
    //Iteration 1
    // Recipe.create(data[0])
    //   .then((res) => {
    //     console.log("Data added", res);
    //   })
    //   .catch((err) => {
    //     console.log("Something went wrong", err);
    //   });


    let insertRecipes = Recipe.insertMany(data);
    // let updateRecipe;
    // let deleteRecipe;

    insertRecipes
      .then((res) => {
        console.log("Data added");

        let updateRecipe = Recipe.findOneAndUpdate({ title: "Rigatoni alla Genovese" }, { $set: { duration: 100 } });
        let deleteRecipe = Recipe.deleteOne({ title: "Carrot Cake" });
        let disconnectPromise = Promise.all([updateRecipe, deleteRecipe]);

        updateRecipe
          .then((res) => {
            console.log("Update success", res);
          })
          .catch((err) => {
            console.log("Could not update", err);
          });

        deleteRecipe
          .then((res) => {
            console.log("Recipe deleted", res);
          })
          .catch((err) => {
            console.log("Could not delete", err);
          });

        disconnectPromise
          .then((res) => {
            console.log(res);
            mongoose.disconnect();
            console.log("Disconnected");
          })
          .catch((err) => {
            console.log("Could not disconnect", err);
          });
      })
      .catch((err) => {
        console.log("Could not insert", err);
      });

    // let disconnectPromise = Promise.all([updateRecipe, deleteRecipe]);

    // disconnectPromise
    //   .then((res) => {
    //     console.log(res)
    //     mongoose.disconnect();
    //     console.log("Disconnected");
    //   })
    //   .catch((err) => {
    //     console.log("Could not disconnect", err);
    //   });

  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });
