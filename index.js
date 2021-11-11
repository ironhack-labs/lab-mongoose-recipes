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
    useUnifiedTopology: true,
  })
  .then((self) => {
    console.log(`Connected to the database: "${self.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany();
  })
  // .then(() => {
  //   return Recipe.create(data[1]);
  // })
  // .then((recipe) => console.log(recipe))
  .then(() => {
    return Recipe.insertMany(data);
  })
  .then((recipes) => {
    recipes.forEach((recipe) => console.log(recipe.title));
  })
  .then(() => {
    return Recipe.updateOne(
      { title: 'Rigatoni alla Genovese' },
      {
        $set: { duration: 100 },
      }
    );
  })
  .then(() => {
    console.log(`Rigattoni updated successfully`);
  })
  .then(() => {
    return Recipe.deleteOne({ title: 'Carrot Cake' });
  })
  .then(() => {
    console.log('Carrot Cake deleted');
  })
  .then(() => {
    mongoose.connection.close(() => {
      console.log(
        'Mongoose default connection disconnected through app termination'
      );
    });
  })
  .catch((error) => {
    console.error('Error connecting to the database', error);
  });
