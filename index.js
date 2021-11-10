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
    return Recipe
      .create([
          { "title": "Donald Trump", "level": "Easy Peasy", "ingredients": ["5 carrot", "1 human", "1 cup of patriotism"], cuisine: "American", dishType: "breakfast", image: "https://images.media-allrecipes.com/images/75131.jpg", duration: 6 , creator: 'Alejandro' },
      ])
  })
  .then(newRecipe => console.log('Se ha creado estos registros:', newRecipe))
  .then(() => Recipe.create(data))
  //.then(() => Recipe.findByIdAndUpdate('618be79ea8a4e05e1108d43e', { $inc: { duration: 100 } }, { new: true }))
  .then(()=> Recipe.updateOne({ duration: 220 }, { duration: 100 }, { new: true }))
  .then(info => console.log("Los detalles de la modificación son:", info))
  .then(()=> Recipe.deleteOne({ title : "Carrot Cake"}))
  .then(() => console.log("Receta eliminada"))
 
  .then(() => mongoose.connection.close())
  .catch(error => {
    console.error('Error connecting to the database', error);
  });























       /* { name: 'Lucas', age: 12, city: 'Madrid', color: 'Blanco' },
        { name: 'Juanito', age: 14, city: 'Estepona', color: 'Grisito' },
        { name: 'Jorgito', age: 1, city: 'Salamanca', color: 'Marroncito' },
        { name: 'Jaimito', age: 16, city: 'Bilbao', color: 'Toffe y caramelo' },
        { name: 'Foie Gras', age: 20, city: 'Bilbao', color: 'Paté' }

    ])
    .then(theNewPatos => console.log('Se ha creado estos registros:', theNewPatos))
    .catch(err => console.log('Se ha producido un error:', err))
 */