require('dotenv').config()

const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');

// Import of the data from './data'
const data = require('./data/data');
const personalData = require('./data/personalRecipe');


// Connection to the database "recipe-app"
mongoose
  .connect(process.env.MONGODB_URI, {
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

    Recipe.create(personalData)
    .then(recipe => console.log(`New recipe added: ${recipe.title}`))
    .catch(error => console.log('An error happened while saving a new recipe:', error));

  })
  .then(() => {

    Recipe.insertMany(data)
    .then(recipe => {
      recipe.forEach(rec => console.log(`New recipe added: ${rec.title}`))
      })
    .catch(error => console.log('An error happened while saving new recipes:', error));

  })

  .then(() => {
    Recipe.updateOne({title: 'Rigatoni alla Genovese'}, { duration: '100' })
    .then(console.log('Update done!'))
    .catch(error => console.log('An error happened while updating:', error));

  })

  .then(() => {

    Recipe.deleteOne({name: 'Carrot Cake' })
    .then(console.log('delete done!'))
    .catch(error => console.log('An error happened while deleting:', error));

  })
  
  /* .then(() => {
    console.error('Conexion to db closed');
    mongoose.connection.close()
  }) */

  .catch(error => {
    console.error('Error connecting to the database', error)
  });

  process.on('SIGINT', () => {
    mongoose.connection.close(() => {
      console.log('Mongoose disconnected through app termination')
      process.exit(0)
    })
  })

