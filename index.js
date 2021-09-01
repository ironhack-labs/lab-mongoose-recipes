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
    Recipe
      .create({ title: 'Lemon Pie', level: 'Amateur Chef', ingredients: 'sugar,egs,milk,flour,lemonjuice', cuisine: 'american', dishtype: 'dessert', image: 'lemonpie', duration: '40', creator: 'Lucia', created: '01/09/2021' },)
      .then(newRecipeFromDB => console.log('The new recipe is', newRecipeFromDB))
    // Run your code here, after you have insured that the connection was made
  })
  .then(() => {
    Recipe
      .create(data)
      .then(allNewRecipes => {
        allNewRecipes.forEach(obj => console.log(`title: ${obj.title}`))
        Recipe
          .findOneAndUpdate({ title: "Rigatoni alla Genovese" }, { duration: 100 }, { new: true })
          .then(info => console.log("Los detalles de la modificación son:", info))
        Recipe
          .deleteOne({ title: "Carrot Cake" })
          .then(info => console.log('Este es un objeto informativo sobre una elimiación', info))
          .catch(error => { console.error('Error delete', error); })

          .catch(error => {
            console.error('Error', error);
          });
      })

      .catch(error => {
        console.error('Error ', error);
      });
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });
mongoose.connection.close();



