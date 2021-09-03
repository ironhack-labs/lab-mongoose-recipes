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
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made
    // Iteration 2
    const firstRecipe = data[0]
    // They called this Model.create, because every Mongoose model has this static method
    Recipe.create(firstRecipe).then((recipe) => {
      recipe.remove().then(() => {
        // Iteration 3
        Recipe.insertMany(data).then((recipes) => {
          recipes.forEach((recipe) => {
            console.log(recipe.title)
          })
          // Iteration 4
          // https://mongoosejs.com/docs/api/model.html#model_Model.findOneAndUpdate
          Recipe.findOneAndUpdate({name: "Rigatoni alla Genovese "}, {duration: 100}, () => {
            console.log("Rigatoni duration updated")

            // Iteration 5
            Recipe.deleteOne({name: "Carrot Cake"}).then(() => {
              console.log("Carrot cake deleted")
              mongoose.connection.close();
            })
          })
        })
      })
    })
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });
