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
    Recipe.create({
      title: 'Brigadeiro for Lazy People',
      level: 'Easy Peasy',
      ingredients: ['1 can of condensed milk', '1tbsp unsalted butter', '3tbsp chocolate powder'],
      cuisine: 'Brazilian',
      dishType: 'dessert',
      duration: 25,
      creator: 'Julia'
    })
    .then (recipe => {
      console.log(`Recipe has been created`)
      Recipe.insertMany(data)
      .then(recipes => {
        recipes.forEach(recipe => {
        console.log(recipe.title)
      })
    })
    .then(recipe => {
      Recipe.findOneAndUpdate({title: 'Rigatoni alla Genovese', duration: 100})
      })
      .then(console.log (`success in updating Rigatoni alla Genovese's duration`))
    })
    .then(recipe => {
      Recipe.deleteOne({title: 'Carrot Cake'})
      .then(console.log(`success deleting Carrot Cake`))
      mongoose.connection.close()
    })
  })
  // .then(
  //   mongoose.connection.close(
  //     console.log('Mongoose default connection disconnected through app terminal')
  //   )
  // )
  .catch(error => {
    console.error('Error connecting to the database', error);
  })

