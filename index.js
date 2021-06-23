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
    useUnifiedTopology: true,
    useFindAndModify: false
  })

  .then(self => {
    console.log(`Connected to the database: "${self.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })

  .then(() => {
    return Recipe.syncIndexes()
  })

  .then(() => {

    return Recipe
      .create(
        {
          title: "Asian Glazed Chicken Thighs",
          level: "Amateur Chef",
          ingredients: [
            "1/2 cup rice vinegar",
            "5 tablespoons honey",
            "1/3 cup soy sauce (such as Silver Swan®)",
            "1/4 cup Asian (toasted) sesame oil",
            "3 tablespoons Asian chili garlic sauce",
            "3 tablespoons minced garlic",
            "salt to taste",
            "8 skinless, boneless chicken thighs"
          ],
          cuisine: "Asian",
          dishType: "main_course",
          image: "https://images.media-allrecipes.com/userphotos/720x405/815964.jpg",
          duration: 40,
          creator: "Chef LePapu"
        })

      .then(Recipe => console.log('¡La nueva recipe es!:', Recipe.title))
      .catch(err => console.log('Se ha producido un error:', err))

    // Run your code here, after you have insured that the connection was made
  })


  .then(() => {
    return Recipe.
      
  })

  .then(() => {

    return Recipe
      .create([...data])
      .then(allRecipes => console.log('¡Las recetas son!:', allRecipes))
      .catch(err => console.log('Se ha producido un error:', err))


  })

  .then(() => {

    return Recipe
      .findOneAndUpdate({ title: "Rigatoni alla Genovese" }, { $set: { duration: 100 } }, { new: true })
      .then(updated => console.log('¡El nuevo valor es!:', updated))
      .catch(err => console.log('Se ha producido un error:', err))

  })

  .then(() => {

    return Recipe
      .deleteOne({ title: 'Carrot Cake' })
      .then(info => console.log('Este es un objeto informativo sobre una elimiación', info))
      .catch(err => console.log('Se produjo un error', err))

  })

  .catch(error => {
    console.error('Error connecting to the database', error);
  });


