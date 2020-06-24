const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false)

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
    Recipe
    .create({title: "Lasaña", cuisine: "italian"})
    .then(newRecipe => console.log("The new recipe is: ", newRecipe.title))
    .then(() =>
    Recipe
    .create(data)
    .then(data.forEach(elem => {
      console.log(elem.title)
    }))
    )
    .catch(err => console.log("There was an error", err))
    .then(()  =>
    Recipe
    .findOneAndUpdate({title: "Rigatoni alla Genovese"}, {duration: 100}, {new: true})
    .then(recipeUpdated => console.log(`The following recipe has been modificated: ${recipeUpdated.title}. The new duration is: ${recipeUpdated.duration}` )))
    .then(() =>
    Recipe
    .deleteOne({title: "Carrot Cake"})
    .then(deleted => console.log("The recipe has been deleted"))
    .then(() =>
    mongoose.connection.close())
  )})
  .catch(error => {
    console.error('Error connecting to the database', error);
  });

