const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then((x) => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany();
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made
    return Recipe.create({
      title: 'Croquembouche',
      level: 'UltraPro Chef',
      cuisine: 'French',
      dishType: 'dessert',
      duration: 65,
    });
  })
  .then(async () => {
    const res = await Recipe.insertMany(data);
    return res.map((recipe) => console.log(recipe.title));
  })
  .then(() => {
    const query = { title: 'Rigatoni alla Genovese' };

    return Recipe.findOneAndUpdate(query, { $set: { duration: 100 } }).then(
      console.log('The update was successful!')
    );
  })
  .then(async () => {
    await Recipe.deleteOne({ title: 'Carrot Cake' });
    return console.log('The recipe was removed.');
  })
  .then(() => {
    return mongoose.connection.close();
  })
  .catch((error) => {
    console.error('Error connecting to the database', error);
  });
