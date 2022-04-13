const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then(x => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })
  .then(() => Recipe.syncIndexes())

  .then(() => {
    Recipe
      .create({ title: 'Mac&Cheese', level: 'Easy Peasy', ingredients: ['Pasta', 'Cheddar Cheese', 'Milk'], cuisine: 'Italian', dishType: 'main_course', image: '', duration: 10, creator: 'Paula', created: '02/06/2020' })
  })

  .then(() =>
    Recipe.insertMany(data)
  )

  .then(() =>
    Recipe
      .findOneAndUpdate({ title: "Rigatoni alla Genovese" }, { duration: 100 })
    // .then(() => console.log("Exito"))
    // .catch(err => console.log('Hubo un error', err))
  )

  .then(() =>
    Recipe
      .deleteOne({ title: "Carrot Cake" })
  )

  .then(() =>
    mongoose.connection.close(() => {
      console.log('Mongoose default connection disconnected through app termination')
      process.exit(0)
    }))

  .catch(error => {
    console.error('Error connecting to the database', error);
  });



