const mongoose = require('mongoose')

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model')
// Import of the data from './data.json'
const data = require('./data')

const recipeIt1 = {
  "title": "Fried eggs",
  "level": "Amateur Chef",
  "ingredients": [
    "Olive oil",
    "1 egg",
    "Salt"
  ],
  "cuisine": "Spanish",
  "dishType": "other",
  "image": "",
  "duration": 5,
  "creator": "All spaniards"
}

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app'

mongoose.set('useFindAndModify', false) // añadido por aviso en la consola

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
    // -> Iteration 2 --------------------------------------------------------
    Recipe.create(recipeIt1)
    .then(recepie => console.log('Action create: doc recepie ' + recipeIt1.title))
    .catch(e => console.log(e))

    // -> Iteration 3 --------------------------------------------------------
    Recipe.insertMany(data)
    .then(recepies => {
      recepies.forEach(rec => console.log(rec.title))
    })
    .then(() => { // incluyo aquí para que ya estén insertados
        // -> Iteration 4 --------------------------------------------------------
        Recipe.findOneAndUpdate({title: "Rigatoni alla Genovese"}, { $set: { duration: 100 }})
        .then(r => console.log('Action update: Rigatoni alla Genovese duration'))
        .catch(e => console.log(e))
        
        // -> Iteration 5 --------------------------------------------------------
        Recipe.deleteOne({title: "Carrot cake"})
        .then(r => console.log('Action deleted: Carrot cake'))
        .catch(e => console.log(e))
    })
    .catch(e => console.log(e))
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  })

  // -> Iteration 6 --------------------------------------------------------
  process.on("SIGINT", () => {
    mongoose.connection
    .close()
    .then(() => console.log("Disconnected"))
    .finally(() => process.exit())
  })