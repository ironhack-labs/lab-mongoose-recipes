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
  .then(() => {
    Recipe
      .create({
        title: 'Empanada de Atún',
        level: 'Easy Peasy',
        ingredients: ['masa brisa', 'atun', 'cebolla', 'pimientos', 'tomate', 'huevo'],
        cuisine: 'fácil y casera',
        dishType: 'snack',
        image: '',
        duration: 40,
        creator: 'Anna',
        created: ''
      })


      .then(title => {
        console.log('se ha creado una nueva reeceta', title)
        return Recipe.create(data)
      })
      // Run your code here, after you have insured that the connection was made

      .then(() => {
        return Recipe
          .find()
          .then(recipes => recipes.forEach(elm => {
            console.log(
              elm.title)
          }))
      })
      .then(() => {
        return Recipe
          .updateOne({ title: 'Rigatoni alla Genovese' }, { duration: 100 })
          .then(console.log('updated'))
      })
      .then(() => {
        return Recipe
          .deleteOne({ title: 'Carrot Cake' })
          .then(console.log('deleted'))
      })



  })

  .catch(error => {
    console.error('Error connecting to the database', error);
  });

mongoose.connection.close(() => {
  console.log('Mongoose default connection disconnected through app termination')
  process.exit(0)


})
