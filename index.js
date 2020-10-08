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
    return self.connection.dropDatabase();
  })
  .then(() => { // Iteration 2 and 3 
    console.log('Database has been dropped')
    Recipe.create({ title: "Pizza", cuisine: "Italian" })
      //createRecipe
      .then((response) => {
        console.log(response)
      })
    let recipeMany = Recipe.insertMany(data)
    recipeMany
      .then(() => {
        console.log('all added')
      })
    Promise.all([recipeMany]) //iteration 4
      .then(() => {
        let updatePromise = Recipe.updateOne({ title: "Rigatoni alla Genovese" }, { $set: { duration: 100 } })
        updatePromise
          .then(() => {
            console.log('Updated worked!')
          })
        let deletePromise = Recipe.deleteOne({ title: 'Carrot Cake' })
        deletePromise
          .then((response) => {
            console.log('Recipe deleted', response)

          })
          .catch((err) => {
            console.log('Not deleted')
            console.log(err)
          })
        Promise.all([updatePromise, deletePromise])
          .then(() => {
            mongoose.connection.close()
              .then((response) => {
                console.log('Connection lost')
              })
              .catch(() => {
                console.log('Not dropped')
              })
          })
      })
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });



