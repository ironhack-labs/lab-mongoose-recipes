const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

//IT1
const newRecipe = {
  title: 'Piadina',
  level: 'Easy Peasy',
  cuisine: 'Italian',
  dishType: 'snack',
  duration: 15,
  creator: 'MimuChef'
}

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
  //IT 2
  .then(() => Recipe.create(newRecipe))
  .then((recipe) => console.log(recipe.title))
  //IT 3
  .then(() => Recipe.create(data))
  .then((recipesArray) => recipesArray.forEach(elem => console.log(elem.title)))
  //IT 4
  .then(() => Recipe.findOneAndUpdate({title: 'Rigatoni alla Genovese'}, {duration: 100}, { new: true }))
  .then((rigatoni) => console.log('Actualización de Rigatoni alla Genovese: ', rigatoni))
  //IT5
  .then(() => Recipe.deleteOne({title:'Carrot Cake'}))
  .then((deletedItem) => console.log('Deletion Info', deletedItem))
  //IT6
  .then(() => mongoose.connection.close())
  .then(() => console.log("Database closed successfully"))
  .catch(error => {
    console.error('Error connecting to the database', error);
  });




