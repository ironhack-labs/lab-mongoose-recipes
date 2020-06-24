const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');
const { create } = require('./models/Recipe.model');

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
    Recipe
    .create({
      title: "Ice-Cream Beer",
      level: "Amateur Chef",
      ingredients: ['beer', 'love', 'cream'],
      cuisine: 'AeroJapo',
      dishType: 'snack',
      image: src = 'https://www.bakedbyrachel.com/wp-content/uploads/adthrive/2012/02/guinness_float_1-480x320.jpg',
      duration: 5,
      creator: "Alvaro",
    })
      .then(newRecipe => console.log('La nueva receta es...', newRecipe))
      .catch(err => console.log('oooohh lo sentinmos, no hay nueva receta', err))
  })
   
Recipe
  .create(data)
  .then((Recipe) => { Recipe.forEach((elm) => console.log(`estas son los títulos de las recetas ${elm.title}`))})


  .then(()=>Recipe.updateOne( {title: 'Rigatoni alla Genovese'}, {duration: 100}, {new: true} ))
  .then(recipe => console.log('el cambio de tiempo es...', recipe))

  
  .then(() => Recipe.deleteOne( {title: 'Carrot Cake'},  {new: true} ))
  .then(deleted => console.log('nuestro postre ha sido eliminado', deleted))
 
  
  .then(() => mongoose.connection.close())

  .catch(error => {
    console.error('Error connecting to the database', error);
  });
