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
    // Before adding any documents to the database, let's delete all previous entries
    return self.connection.dropDatabase();
  })
  .then(() => {

    const recipePizza = {
      title: 'Hawaiian Pizza',
      level: 'Amateur Chef',
      ingredients: ['dough', 'tomatoes', 'cheese', 'pineapple'],
      cuisine: 'Italian',
      dishType: 'Main course',
      duration: 60,
      creator: 'Salvatore',
      created: undefined
    };

    // Start async operation of creating a document
    const pr = Recipe.create(recipePizza);

    return pr;
  })
  .then((createdRecipe) => {
    console.log('createdRecipe', createdRecipe);

    const pr = Recipe.insertMany(data);

    return pr;
  })
  .then((result) => {
    const titleOfRecipe = result.map((recipe) => {
      return recipe.title;
    })
    console.log('title of each recipe', titleOfRecipe);

    const pr = Recipe.findOneAndUpdate(
      { title: "Rigatoni alla Genovese" },
      { $set: { duration: 100 } }
    );

    return pr;
  })
  .then(() => {
    console.log('Successfully updated!');

    const pr = Recipe.deleteOne({ title: "Carrot Cake" });

    return pr;
  })
  .then((result) => {
    console.log("result.deletedRecipe", result.deletedCount);
    console.log('Successfully deleted Recipe!');
    mongoose.connection.close(() => {
      console.log('Mongoose connection disconnected due to app termination');
    })
  }
  )

  .catch(error => {
    console.error('Error connecting to the database', error);
  });


