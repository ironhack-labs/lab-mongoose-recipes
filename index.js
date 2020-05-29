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
  .catch(error => {
    console.error('Error connecting to the database', error);
  })
  .then(() => {
    Recipe
      .create({
        title: "Limoncello",
        level: "Amateur Chef",
        ingredients: [
          "1 cup sugar",
          "10 lemons",
          "1l pure alcohol"
        ],
        cuisine: "Italian",
        dishType: "breakfast",
        image: "https://images.media-allrecipes.com/userphotos/720x405/815964.jpg",
        duration: 30,
        creator: "Nardo Kraaijeveld"
      })
      .then(recipe => {
        console.log("You're recipe got added", recipe)
      })
      .catch(error => {
        console.log("Error you're recipe did not got added", error)
      })
  })
  .then(() => {
    Recipe
      .insertMany(data)
      .then(recipe => {
        return Recipe.find()
          .select('title')
          .then((theResponse) => {
            console.log(`These are the recipes that got added, ${theResponse}`)
          })
      })
      .catch((error) => {
        console.log('error', error)
      })
      .then(() => {
        Recipe
          .findOneAndUpdate({ title: "Rigatoni alla Genovese" }, { duration: 100 }, {new: true})
          .then(recipe => {
            console.log('The duration of the recipe got adjusted', recipe)
          })
          .catch(error => {
            console.log('The update did not succeeded', error)
          })
      })
      .then(() => {
        Recipe
          .deleteOne({ title: "Carrot Cake" })
          .then(recipe => {
            console.log('The recipe got deleted', recipe)
          })
          .catch(error => {
            console.log('The recipe did not got deleted', error)
          })
          .then(() => {
            mongoose.connection.close()
            console.log("SERVER CONNECTION CLOSED");
          })
      })
  })
