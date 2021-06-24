const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  // .then(self => {
  //   console.log(`Connected to the database: "${self.connection.name}"`);
  //   // Before adding any recipes to the database, let's remove all existing ones
  //   return Recipe.deleteMany()
  // })
  .then(() => {
    Recipe.deleteOne({ title: "Carrot Cake"})
    .then(deletedRecipe => {
      console.log(deletedRecipe);
      mongoose.connection.close();
    });
  })
  // .then(() => {
  //   Recipe.findOneAndUpdate({ title: "Rigatoni alla Genovese"}, {duration: 100},
  //   {new: true})
  //   .then(updatedRecipe => {
  //     console.log(updatedRecipe);
  //     mongoose.connection.close();
  //   });
  // })
  // .then(() => {
  //   Recipe.insertMany(data)
  //   .then(recipe => {
  //     recipe.forEach(recipe => console.log(recipe.title));
  //     mongoose.connection.close();
  //   });
  // })
  //.then(() => {
    // Recipe.create({
    //   title: 'Bla',
    //   cuisine: 'Hr Bu',
    //   dishType: "soup"
    // })
    // .then(recipe => {
    //   console.log(recipe.title)})
  
    // Run your code here, after you have insured that the connection was made
 // })
  .catch(error => {
    console.error('Error connecting to the database', error);
  })