const mongoose = require('mongoose');

// require('./configs/connection')                 // new!
// const Dog = require('./models/dog.model')       // new!
// const recipe1 = { title: 'tomate aliñado', level: 'Easy Peasy', ingredients: ['tomate', 'cebolla', 'sal', 'aceite', 'vinagre'], cuisine: 'ni idea', dishType: 'default', duration: 3, creator: 'D.R.', create: 'default' };
// Recipe.create(recipe1, (error, recipe) => {
//   if (error) {
//     console.log('An error happened:', error);
//     return;
//   }
//   console.log('The recipe is saved and its value is: ', recipe);
// });
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

    Recipe.create({ title: 'tomate aliñado', level: 'Easy Peasy', ingredients: ['tomate', 'cebolla', 'sal', 'aceite', 'vinagre'], cuisine: 'ni idea', dishType: 'default', duration: 3, creator: 'D.R.' })
      .then(recipe => {
        console.log('La receta añadida es', recipe.title)
        Recipe.create(data)
          .then(allRecipe => {
            allRecipe.forEach(data => console.log('las recetas son', data.title))
            Recipe.updateOne({ "title": "Rigatoni alla Genovese" }, { "duration": 100 })
              .then(Rigatoni => console.log("El tiempo de cocción es:", data.duration))
            Recipe.deleteOne({ "title": "Carrot Cake" })
              .then(function (info) {
                console.log('Carrot Cake deleted ;)')
                 mongoose.connection.close();
            
              });
            // Run your code here, after you have insured that the connection was made
           
          })
          .catch(error => {
            console.error('Error connecting to the database', error);
          })
      })
  })