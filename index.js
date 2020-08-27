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
// ITERATION 2
    Recipe.create({
      title: 'Chocolate mousse',
      level: 'Easy Peasy',
      ingredients: ['chocolate', 'eggs', 'sugar'],
      cuisine: 'International',
      dishType: 'dessert',
      duration: 20,
      creator: 'a chocolate lover'
    })
    .then((newRecipe) => {
      console.log(newRecipe.title)
// ITERATION 3
      Recipe.insertMany(data)
      .then((newRecipe) => {
        newRecipe.forEach((recipe) => {
          console.log(recipe.title)
        })
// ITERATION 4
      Recipe.findOneAndUpdate(
        {title: 'Rigatoni alla Genovese'},
        {duration: 100}
        )
      .then((newRecipe) => {
        console.log('Recipe successfully updated')
      })
      .catch(error => {
        console.log(error)
      })
// ITERATION 5
      Recipe.deleteOne(
        {title: 'Carrot Cake'}
      )
      .then((newRecipe) => {
        console.log('Recipe sucessfully deleted')
      })
      .catch(error => {
        console.log(error)
      })
    })
  })
// ITERATION 6
    mongoose.connection.close()
    .then((end) => {
      console.log('Mongoose is disconnected')
    })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });
})