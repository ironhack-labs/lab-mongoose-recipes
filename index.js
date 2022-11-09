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
  .then(recipe => {
    // Run your code here, after you have insured that the connection was made
    console.log("El método .find() retorna un Array", recipe)
    return Recipe.create([{ title: 'pasta with tomato', level: 'Easy Peasy', ingredients: ['pasta', 'tomato'], cuisine: 'italian', dishType: 'main_course', image: "https://images.media-allrecipes.com/images/75131.jpg", duration: 10, creator: 'me', created: Date.now() }])

  })
  .then((recipe) => {
    console.log(`Connected to the database: ${recipe}`);
    return Recipe.insertMany(data)
  }
  )

  .then(() => {
    return Recipe.findOneAndUpdate({ title: "Rigatoni alla Genovese" }, { duration: 100 })
  })


  .then(recipe => {
    console.log(`The recipe was deleted`);
    return Recipe.deleteOne({ title: "Carrot Cake" })
  })

  .then(() => {
    mongoose.connection.close(() => {
      console.log('Mongoose default connection disconnected through app termination')
      process.exit(0)
    })
  }
  )

  .catch(error => {
    console.error('Error connecting to the database', error);
  });