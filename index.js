const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

let promise1, promise2, promise3, promise4, promise5;

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
    // Iteration 2
    const hotChocolate = {
        title: "Hot chocolate",
        level: "Easy Peasy",
        ingredients: ["milk", "chocolate", "sugar (optionnal)"],
        cuisine: "comfort food",
        dishType: "drink",
        duration: 2,
        creator: "Mélu"
      }

    function printTitle(recipe) {
      promise1 = Recipe.find({ title: recipe.title }, "title")
          .then(recipe => console.log(recipe[0].title))
          .catch(err => console.log(err));
    }

    promise2 = Recipe.create(hotChocolate)
    .then(success => printTitle(success))
    .catch(error => console.log(error));

      // Iteration 3
    promise3 = Recipe.insertMany(data)
    .then(success => {
      success.forEach(item => console.log(item.title));
    })
    .then(() => {
      // Iteration 4 - If I try to log the recipe it still says duration 220 but in Compass it changes to 100
      promise4 = Recipe.findOneAndUpdate({ title: "Rigatoni alla Genovese" }, { duration: 100 })
      .then(recipe => console.log("Recipe successfully updated! "))
      .catch(error => console.log(error));
    })
    .then(() => {
      // Iteration 5
      promise5 = Recipe.deleteOne({ title: "Carrot Cake" })
      .then(recipe => console.log("Recipe successfully deleted!"))
      .catch(error => console.log(error));
    })
    .catch(error => console.log(error));
  })
  .then(() => {
    Promise.all([promise1, promise2, promise3, promise4, promise5])
    .then(() => {
        mongoose.connection.close(() => {
          console.log('Mongoose default connection disconnected through app termination');
          process.exit(0);
        });
    })
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });
