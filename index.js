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
    // Before adding any documents to the database, let's delete all previous entries
    return self.connection.dropDatabase();
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });

  Recipe
    .create({ 
      title: 'Paella',
      level: 'Easy Peasy', 
      ingredients: ['Rice', 'Salt', 'Meat'], 
      cuisine: 'Spanish', 
      dishType: 'main_course', 
      image: "https://images.media-allrecipes.com/images/75131.jpg", 
      duration: 60, 
      creator: "Adrián", 
      // created: "2020-11-11"
    })
    .then(theNewRecipe => console.log('El título de la receta es:', theNewRecipe.title))      
    .catch(err => console.log('Error creando el registro:', err))

  Recipe
    .insertMany(data)

    .then(allTheRecipes => {
      allTheRecipes.forEach(allTheRecipes => console.log("Los títulos de las recetas son", allTheRecipes.title))
    })

    .catch(err => console.log("Hubo un error!", err))

  Recipe
    .findOneAndUpdate({duration: 220}, {duration: 100}, { new: true })
    .then(changed => console.log("Los detalles de la modificación son:", changed.duration))
    .catch(err => console.log('Hubo un error', err))
 
  Recipe
    // .findByIdAndDelete('5fac7b0a1912887f9bfceb58')
    .deleteOne({title: "Carrot Cake"})
    .then(deletedRecipe => {
      console.log('La Carrot Cake ha sido eliminada', deletedRecipe)
      return mongoose.connection.close()

    })
    .catch(err => console.log('Se produjo un error', err))  

  



