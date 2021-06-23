const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');
//console.log("las recetis", data)
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
  .then(() => {
    return Recipe.syncIndexes()
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made
    Recipe
      .create({ title: 'Arepa e huevo', level: 'UltraPro Chef', ingredients: ['Harina de maíz, huevo, aceite, sal'], cuisine: 'No sé', dishType: 'other', image: 'http://1.bp.blogspot.com/-ahIhgGZXO9c/UczkL_wDEaI/AAAAAAAABqE/sD_0nRtFWgE/s1600/DSC_0922.JPG', duration: 30, creator: 'Las Cartageneras', created: 23 / 06 / 2021 })
      .then(theNewRecipe => console.log('¡La nueva receta fué creado!:', theNewRecipe))
      .catch(err => console.log('Se produjo un error.... =>', err))
    return Recipe
      .create(data)
      .then(theNewRecipe => {
        console.log('¡La nueva receta fué creado!:', theNewRecipe)
      })
      .catch(err => console.log('Se produjo un error.... =>', err))
  })
  .then(() => {
    const query = { title: "Rigatoni alla Genovese" }
    return Recipe
      .findOneAndUpdate(query, { duration: 100 })
      .then(info => console.log("La duración ha sido actualizada:", info.duration))
      .catch(err => console.log('Hubo un error', err))
  })
  .then(() => {
    return Recipe
      .deleteOne({ title: 'Carrot Cake' })
      .then(info => console.log('Se ha eliminado', info))
      .catch(err => console.log('Se produjo un error', err))
  })
  .then(() => {
    mongoose.disconnect()
  })

  .catch(error => {
    console.error('Error connecting to the database', error);
  });

