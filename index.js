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

    // async function test(recipe) {
    //   const recipeData =  await Recipe.create(recipe) // data[0]
    // }

    // test(data[0])

    // const recipeData = Recipe.create(data[0])
    // console.log(recipeData.title)
    const recipeData = Recipe.insertMany(data)
    for (let i = 0, i<data.length; i++){
      console.log(data[i].title)
    }
    return recipeData
  })
  .then((recipeData) => {
    recipeData.findOneAndUpdate()
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });
