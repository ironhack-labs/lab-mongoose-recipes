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
    // Run your code here, after you have insured that the connection was made

    // ITERATION 2 - CREATE A RECIPE 

    return Recipe.create({
      title: 'Vegan Croissant',
      level: 'Amateur Chef',
      ingredients: ['Yeast', 'Sugar', 'Flour', 'Water', 'Vegan Butter'],
      cuisine: 'French', 
      dishType: 'breakfast',
      image: 'https://i.pinimg.com/originals/ca/1b/eb/ca1beb1e1aa5932303d4db9ab216998f.jpg',
      duration: 50,
      creator: 'Pauline'
    }).then(recipe => {
      console.log(recipe.title);
    })

  })
  .then(() => {

    // ITERATION 3 - INSERT MULTIPLE RECIPES

    return Recipe.insertMany(data).then(recipes => {
      recipes.forEach(recipe => {
        console.log(recipe.title);
      })
    });

  })
  .then(() => {

    // ITERATION 4 - UPDATE RECIPE

    return Recipe.findOneAndUpdate(
      { title: 'Rigatoni alla Genovese' },
      { duration: 100 },
      { new: true }
    ).then(recipe => {
      console.log(`${recipe.title} has been updated!`); 
    })

  })
  .then(() => {

    // ITERATION 5 - REMOVE A RECIPE

    return Recipe.deleteOne({ title: 'Carrot Cake' }).then(() => {
      console.log('Carrot cake has been deleted!'); 
    })

  })
  .then(() => {

    // ITERATION 6 - CLOSE THE DATABASE

    return mongoose.disconnect(); 

  })
  .then(() => {
    console.log('Mongoose is now disconnected from our database in MongoDB.');
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });