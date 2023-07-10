const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://0.0.0.0:27017/recipe-app';

mongoose.set('strictQuery', true);

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then(x => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made
    return Recipe.create({title: 'Bitoque', level: 'Amateur Chef', cuisine: 'Portuguese', creator: 'Chef Diogo' })
  })
  .then(recipe => console.log('This recipe has been created ', recipe))
  .then(() => Recipe.insertMany(data))
  .then(recipes => console.log('This recipes have been inserted in the database: ', recipes))
  .then(() => {
   return Recipe.findOneAndUpdate({title: 'Rigatoni alla Genovese'}, {duration: 100 }, {new: true})
  })
  .then(updatedRecipe => console.log('This recipe has been updated: ', updatedRecipe))
  .then(() => {
    return Recipe.deleteOne({title: 'Carrot Cake'})
  })
  .then(deletedRecipe => console.log('Sucess!You deleted: ', deletedRecipe.deletedCount))
  .then(()=>  {
    return mongoose.connection.close()
})
.then(()=> console.log('Mongoose connection has closed'))
  .catch(error => {
    console.error('Error connecting to the database', error);
  });
