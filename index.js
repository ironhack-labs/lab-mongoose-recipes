const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data.json');

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
    // return self.connection.dropDatabase();
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });

  const newRecipe = {
    title: "Apple Pie",
    level: "Amateur Chef",
    ingredients: ['Apples', 'Sugar', 'Flour'],
    cuisine: "American",
  }

const createRecipe = () => {
  Recipe.create(newRecipe).then(() => {
    console.log(newRecipe.title);
  }).catch((err) => {
    console.log(err);
  });
}

const createManyRecipes = () => {
  Recipe.insertMany(data).then(() => {
    data.forEach(() => {
      // console.log(newRecipe.title);
    })
  }).catch((err) => {
    console.log(err);
  });
}

const updateRecipe = () => {
  Recipe.updateOne({title: 'Rigatoni alla Genovese'}, { duration: 100 }).then(() => {
    console.log('done');
  }).catch((err) => {
    console.log(err);
  });
}


const removeRecipe = () => {
  Recipe.deleteOne({title: 'Carrot Cake'}).then(() => {
    console.log(`Removed ${title}`);
  }).catch((err) => {
    console.log(err);
  });
}


// createRecipe();
// createManyRecipes();
// updateRecipe();
removeRecipe();


