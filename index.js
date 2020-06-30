const mongoose = require('mongoose');
const process = require ('process')

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const recipeBologneseSpaghetti= {
  "title": "Bolognese spaghetti",
  "level": "Amateur Chef",
  "ingredients": [
    "400 gr. spaghettis",
    "300 gr. minced meat",
    "200 gr. tomato sauce",
    "1 carrot",
    "100 ml white wine",
    "1 garlic",
    "salt to taste",
    "1 onion"
  ],
  "cuisine": "Italian",
  "dishType": "main_course",
  "image": "https://www.superama.com.mx/views/micrositio/recetas/images/comidaitaliana/pasta-bolonesa/Web_fotoreceta.jpg",
  "duration": 30,
  "creator": "Aitor Guerrero"
}

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify : false
  })
  .then(self => {
    console.log(`Connected to the database: "${self.connection.name}"`);
    // Before adding any documents to the database, let's delete all previous entries
    return self.connection.dropDatabase();
  })
  .then(() => {
    //Iteration 2
      Recipe.create (recipeBologneseSpaghetti)
            .then (recipe => console.log(`${recipe.title} created`))
    //Iteracion 3
            .then (() => Recipe.insertMany (data))
            .then (recipeData => recipeData.forEach(element => {
              console.log(`${element.title} created`)
            }))
    //Iteracion 4
            .then (() => Recipe.findOneAndUpdate({ title : 'Rigatoni alla Genovese'}, {duration : 100}, {new : true}))
            .then (recipeUpdate => console.log(`${recipeUpdate.title} duration is changed to ${recipeUpdate.duration}`))
    //Iteracion 5
            .then(() => Recipe.deleteOne({ title: 'Carrot Cake' }))
            .then(() =>console.log(`The recipe was deleted`))
    //Iteracion 6
            .then(() => {
              mongoose.connection.close()
              console.log('Database disconnected')
              process.exit(0)
            })
            .catch(e => console.log("error ", e))
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });

  process.on('SIGINT', () => {
    mongoose.connection.close(() => {
      console.log('Mongoose default disconnected');
      process.exit(0);
    });
  })