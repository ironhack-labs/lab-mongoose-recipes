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
    // Run your code here, after you have insured that the connection was made

  .then(() => {
    return Recipe.create({ title: 'Arepa', level: 'Easy Peasy', ingredients: 'Harina de Maíz',
    cuisine: 'Venezuelan', dishType: 'other', duration: 15}) 
  })
  .then(theRecipe => console.log(`Hemos creado una receta, ${theRecipe}`))

  .then(() => Recipe.create(data))

  .then((recipes) => console.log("Hemos creado todas las recetas!", recipes))
  
  .then(() => Recipe.updateOne({ title: 'Rigatoni alla Genovese' }, { $inc: { "duration": -120 } }))

  .then(() => Recipe.deleteOne({ title : "Carrot Cake" }))
  .then((deleted) => console.log("Adios, Carrot Cake :(", deleted))



  .catch(error => {
    console.error('Error connecting to the database', error);
  });
