const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model.js');
// Import of the data from './data.json'
const data = require('./data.json');
const { create, updateOne } = require('./models/Recipe.model.js');

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
    return Recipe.syncIndexes()
  })
  .then(() => {

    return Recipe.create([
      {
        title: 'Frijoles',
        level: 'Easy Peasy',
        ingredients: ['Frijoles'],
        cuisine: 'Brazilian',
        dishType: 'main_course',
        image: 'https://images.media-allrecipes.com/images/75131.jpg',
        duration: 50,
        creator: 'David',
        created: new Date(),
      }
    ])
      .then(theRecipe => {
        console.log('The new recipe is:', theRecipe[0].title)
        return Recipe.insertMany(data)
      })
  })
  .then(allRecipes => {
    console.log(allRecipes[0].title)
    return Recipe.updateOne({ duration: 220 }, { duration: 100 })
  })
  .then(updatedRecipe => {
    console.log('The updated recipe was: ', updatedRecipe)
    return Recipe.deleteOne({ title: 'Carrot Cake' })
  })
  .then(info => console.log('Carrot Cake was deleted!!!', info))
  .catch(error => {
    console.error('Error connecting to the database', error);
  });
