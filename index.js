const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');
const { findOneAndUpdate } = require('./models/Recipe.model');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

const myVeganRecipe = {
  title: 'hamburguer', 
  level: 'Easy Peasy',
  ingredients: ['legums'],
  cuisine: 'blabla',
  dishType: 'breakfast',
  duration: 20,
  creator: 'Yo'}

// Connection to the database "recipe-app"
mongoose.set('useFindAndModify', false);
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
    Recipe.create(myVeganRecipe) 
    .then((myVeganRecipe) => console.log(myVeganRecipe.title))
    .then(() => 
      Recipe.insertMany(data)
    )
    .then(() => data.forEach(recipe => {
      console.log(recipe.title)
    }))
    .then(() => 
      Recipe.findOneAndUpdate({ title: 'Rigatoni alla Genovese' }, { duration: 100 }, { new: true })
    )
    .then((recipe) => console.log(`The ${recipe.title} recipe has been updated`))
    .then(() => 
      Recipe.deleteOne({title: 'Carrot Cake'})
    )
    .then(() => console.log(`The Carrot Cake has been deleted`))
    .then(() => listItems())
    .then(() => {
      mongoose.connection.close()
      console.log('Database closed.')
      process.exit(0)
    })
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });


  function listItems() {
    return Recipe.find({}, {title: 1})
      .then(recipes => console.log(recipes))
  }

  process.on('SIGINT', () => {
    mongoose.connection.close().then(() => {
      console.log('Mongoose default disconnected');
      process.exit(0);
    });
  }) 