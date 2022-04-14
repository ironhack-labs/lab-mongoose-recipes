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
  //crear
  .then(() => Recipe.syncIndexes())
  .then(() => {
    Recipe
      .create({ title: 'huevos_fritos', level: "Easy Peasy", ingredients: ["huevos", "aceite"], cuisine: 'española', dishType: 'main_course', duration: 5, creator: "fran" })
  })
  // crear muchos
  .then(() => Recipe.create(data))
  .then(() => Recipe.findOneAndUpdate({ title: "Rigatoni alla Genovese" }, { duration: 100 }))
  .then(() => {
    return Recipe
      .deleteOne({ title: "Carrot Cake" })
      .then(info => console.log('Este es un objeto informativo sobre una elimiación', info))
      .catch(err => console.log('Se produjo un error', err))
  })
  // .then(() => Recipe.deleteOne({ title: "Carrot Cake" }))
  .then(() => {
    return mongoose.connection.close(() => {
      console.log('Mongoose default connection disconnected through app termination')
      process.exit(0)
    })
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });
