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
  .then( () => {
    return Recipe.create(data[0])
  })
  .then(newRecipe => {
    return console.log(`we have recieved a new recipe ${newRecipe.title}`)
  })
  .then(() => {
    return Recipe.insertMany(data)
  })
  .then((allRecipes) => {
    return console.log(`We have now ${allRecipes} in the database`)
  })
  .then(() => {
    return Recipe.findOneAndUpdate({ title: 'Rigatoni alla Genovese' }, { $set: { duration: 100}}, {new: true})
  })
  .then( () => {
    return console.log(`Youhuouuuu this worked!`)
  })
  .then( () => {
    return Recipe.deleteOne({title: 'Carrot Cake'})
  })
  .then(  () => {
    return console.log(`we have deleted a cake`)
  })
  .then( () => {
    mongoose.connection.close()
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });
