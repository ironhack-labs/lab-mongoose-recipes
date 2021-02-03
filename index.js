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
    // Run your code here, after you have insured that the connection was made
    Recipe.create({
      title: 'Spanish Omelette',
      level: 'Amateur Chef',
      ingredients: ['potatoes', 'eggs', 'onions', 'love'],
      cuisine: 'Spanish',
      dishType: 'main_course',
      duration: 30,
      creator: 'Chef Abel',
    })
  //     .then(newRecipe => {
  //       console.log("Estamos viendo la nueva receta", newRecipe, "con titulo", newRecipe.title)
  //       Recipe.insertMany(data)
  //         .then(arrRecipes => {
  //           console.log(arrRecipes)
            
  //       })
  //     })
  // })
  .then(newRecipe => console.log('This is the new recipe', newRecipe, 'Its title is', newRecipe.title))
  .then(() => Recipe.insertMany(data))
  .then(arrRecipes => {
    arrRecipes.forEach(element => {
      console.log(element.title)
    });
  })
  .then(() => Recipe.findOneAndUpdate({ title: 'Rigatoni alla Genovese' }, { duration: 100 }, { new: true }))
  .then(newDuration => console.log(newDuration))
  .then(() => Recipe.deleteOne({ title: 'Carrot Cake' }))
  .then(deletedRecipe => console.log(deletedRecipe))
  .catch(error => {
    console.error('Error connecting to the database', error);  
  })
  .then(() => mongoose.disconnect())
  })
