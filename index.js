const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

const recipe = {
  title: 'Asian Glazed Chicken Thighs',
  level: 'Amateur Chef',
  ingredients: [
    '1/2 cup rice vinegar',
    '5 tablespoons honey',
    '1/3 cup soy sauce (such as Silver Swan®)',
    '1/4 cup Asian (toasted) sesame oil',
    '3 tablespoons Asian chili garlic sauce',
    '3 tablespoons minced garlic',
    'salt to taste',
    '8 skinless, boneless chicken thighs',
  ],
  cuisine: 'Asian',
  dishType: 'main_course',
  image: 'https://images.media-allrecipes.com/userphotos/720x405/815964.jpg',
  duration: 40,
  creator: 'Chef LePapu',
};

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(self => {
    console.log(`Connected to the database: "${self.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
      .then(() => {
        Recipe.create(recipe).then(recipe =>
          console.log(`Recipe Title: ${recipe.title}`)
        );
      })
      .catch(error =>
        console.log('An error happened while saving a new recipe:', error)
      );
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made
    Recipe.insertMany(data)
      .then(setTimeout(showRecipes, 1000))
      .then(setTimeout(update, 1000))
      .then(setTimeout(removeRecipe, 1000))
      .then(setTimeout(closeRecipe, 1500))
      .catch(error =>
        console.log('An error happened while saving a new recipe:', error)
      );
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });

function showRecipes() {
  console.log('All the Recipes Titles');
  Recipe.find()
    .then(recipes => {
      recipes.forEach(recipe => console.log(` --> Title: ${recipe.title}`));
    })
    .catch(err =>
      console.log(`Error occurred during getting recipes from DB: ${err}`)
    );
}

function update() {
  Recipe.updateMany({ title: 'Rigatoni alla Genovese' }, { duration: 100 })
    .then(info => console.log('Updated Rigatoni alla Genovese: ', info))
    .catch(error => console.log(error));
}

function removeRecipe() {
  Recipe.deleteOne({ title: 'Carrot Cake' })
    .then(info => console.log('Deletion info: ', info))
    .catch(error => console.log(error));
}

function closeRecipe() {
  mongoose.connection.close(() => {
    console.log(
      'Mongoose default connection disconnected through app termination'
    );
    process.exit(0);
  });
}
