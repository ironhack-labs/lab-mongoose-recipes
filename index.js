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
    // Run your code here, after you have insured that the connection was made

    Recipe

      .create(
        {
          title: 'pollo al curry',
          level: 'Amateur Chef',
          ingredients: ['2 pechuga de pollo', '2 cebolletas', 'curry molido', 'comino molido', ' 1/2 cup leche de coco', '1/2 cup aceite de oliva', 'pimienta negra'],
          cuisine: 'india',
          dishType: 'main course',
          image: 'https://images.media-allrecipes.com/images/75131.jpg',
          duration: 100,
          creator: 'Tajmaguille',
        }
      )
      .then(recipe => {
        //console.log(`Esta receta se llama ${recipe.title}`)
        return Recipe.insertMany(data)
      })
      .then(recipe => {
        //recipe.forEach(elm => console.log(elm.title))
        return Recipe.updateOne({ title: 'Rigatoni alla Genovese' }, { duration: 100 })
      })

      .then(recipe => {
        console.log(`ahora la duration es ${recipe.duration}`)
        return Recipe.deleteOne({ title: 'Carrot Cake' })

      })
      .then(() => mongoose.connection.close())

  })


  .catch(error => {
    console.error('Error connecting to the database', error);
  });
