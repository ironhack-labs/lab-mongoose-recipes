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
  Recipe.create({ title: 'Sarmale', cuisine: 'Romanian' })
  .then(recipe => console.log(`Successfully created recipe for ${recipe.title}.`))
  .catch(err => console.log(`Error occured while creating recipe: ${err}.`))

  Recipe.insertMany(data)
  .then(recipes => recipes.forEach(recipe => console.log(`Successfully added recipe for ${recipe.title} to the database.`)))
  .then(() => {
  
    // Experimenting with multiple .then(s). findOneAndUpdate results in deprecation errors?
    Recipe.updateOne({ title: "Rigatoni alla Genovese" }, { duration: 100 })
    .then(console.log(`Successfully updated data.`))
    .catch(err => console.log(`Error occured during update: ${err}`))
  })
  .catch(err => console.log(`Error occured while adding recipes to the database: ${err}`))

  // Using setTimeout alternative to addtional .then(s).
  setTimeout(() => {
    Recipe.deleteOne({ title:'Carrot Cake' })
      .then(console.log(`Successfully deleted data.`))
      .catch(err => console.error(`Error occured while deleting data: ${err}.`));
  }, 1000)

  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });


  process.on('SIGINT', () => {
    mongoose.connection.close(() => {
      console.log('Mongoose default connection terminated.');
      process.exit(0);
    });
  });