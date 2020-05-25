const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');
const newrecipe = require('./newrecipe');

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
    Recipe.create(newrecipe)
      .then(recipe => console.log())
      .catch(e => console.log("error to create", e))
    Recipe.insertMany(data)
      .then(newdata => console.log(`Some new reciepes were added to the database: ${newdata}`))
      .catch(e => console.log("error to insert", e))
      .then(() => {
        Recipe.findOneAndUpdate({ title: "Rigatoni alla Genovese" }, { duration: 100 })
          .then(updatedRecipe => console.log(`Recipe updated correctly: ${updatedRecipe.duration}`))
          .then(() => {
            Recipe.deleteOne({ title: 'Carrot Cake' })
              .then(() => console.log("recipe deleted"))
              .then(() => mongoose.connection.close())
          })
          .catch(e => console.log("error to delete", e))
      })
      .catch(e => console.log("error to update", e))

    //Run your code here, after you have insured that the connection was made
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });

