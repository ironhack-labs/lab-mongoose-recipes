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
    return Recipe
          .create({
              title: 'Bolognesa',
              level: 'UltraPro Chef',
              ingredients: ['tomato', 'oil', 'meet', 'pasta', 'carrots'],
              cuisine: 'Italian',
              dishType: 'main_course',
              duration: 30,
              creator: 'Vladick',
          })
  })
  .then(_ => Recipe.create( data ) )
  .then(theNewRecipies => console.log(theNewRecipies))
  .then(_ => Recipe.updateOne({title: 'Rigatoni alla Genovese'}, {duration: 100}))
  .then(_ => Recipe.deleteOne({title: 'Carrot Cake'}))
  .then(_ => mongoose.connection.close())
  .catch(error => {console.error('Error connecting to the database', error);});
  mongoose.connection.close()
