const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then((x) => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany();
  })
  .then(() => {
    return Recipe.create({
      title: 'Cooking with Tookin',
      level: 'Amateur Chef',
      ingredients: [
        '1/10 cup rice vinegar',
        '22 tablespoons honey',
        '1/3 cup soy sauce (such as Silver Swan®)',
        '1/4 cup Asian (toasted) sesame oil',
        '3 tablespoons Asian chili garlic sauce',
        '3 tablespoons minced garlic',
        'salt to taste',
        '8 skinless, boneless chicken thighs'
      ],
      cuisine: 'French',
      dishType: 'main_course',
      image:
        'https://images.media-allrecipes.com/userphotos/720x405/815964.jpg',
      duration: 40,
      creator: 'Piotr'
    });
    // Run your code here, after you have insured that the connection was made
  })

  // .then((recipe) => console.log('This recipe was saved as:', recipe.title))

  .then(() => {
    return Recipe.insertMany(data).then((data) =>
      data.forEach((recipe) =>
        console.log('A new recipe was added: ' + recipe.title)
      )
    );
  })

  .then(() => {
    const toUpdate = { title: 'Rigatoni alla Genovese' };
    return Recipe.findOneAndUpdate(toUpdate, { $set: { duration: 100 } });
  })

  .then((recipe) => {
    return console.log('This recipe was updated: ' + recipe.title);
  })

  .then(() => {
    return Recipe.deleteOne({ title: 'Carrot Cake' });
  })

  .then(() => {
    console.log('Carrot cake was deleted');
    mongoose.disconnect();
  })

  .catch((error) => {
    console.error('Error connecting to the database', error);
  });
