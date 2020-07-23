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
    Recipe.create(myRecipe)
      .then((recipe) => console.log(`This recipe was saved ${recipe}`))
    
    .then(() => Recipe.insertMany(data))
      .then((recipe) => console.log(`This recipe was saved ${recipe}`))

    .then (() => Recipe.findOneAndUpdate({ title: "Rigatoni alla Genovese" }, { duration: 100 }, { new: true }))
      .then((recipe) => console.log(recipe))

    .then (() => Recipe.deleteOne({title: "Carrot Cake"}))
      .then((recipe) => console.log(recipe))

    .then(() => mongoose.connection.close())
      .then(() => console.log('db closed'))
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });

const myRecipe = {title: 'Kartoffelpuffer', level: 'Easy Peasy', ingredients: ['potatoes', 'onion', 'eggs', 'salt', 'pepper'], cuisine: 'German', dishType: 'main_course', duration: 30};

