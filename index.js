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
  .then(() => Recipe.syncIndexes())
  .then(() => {
    // Run your code here, after you have insured that the connection was made

    return Recipe.create(
      {
        title: "Lemon duck",
        level: "Amateur Chef",
        ingredients: "Duck, lemon and salt",
        cuisine: "chinese",
        dishType: 'main_course',
        duration: 30,
        creator: 'Adrian'
      })
  })
  .then(duckRecipe => {
    console.log('la receta es', duckRecipe.title)
    return Recipe.create(data)
  })
  .then(recipes => {
    console.log("el nombre es", recipes)
    return Recipe.findOneAndUpdate({ title: 'Rigatoni alla Genovese'}, {duration: 100})
  })
  .then(() => Recipe.deleteOne({title: "Carrot Cake"}))
  .catch(error => {
    console.error('Error connecting to the database', error);
  });

mongoose.connection.close()