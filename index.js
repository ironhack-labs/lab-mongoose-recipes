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
    console.log('Connection has been established.');
    return Recipe.create({
      title: 'Strogonoff',
      level: 'Easy Peasy',
      ingredients: ['rice, mushrooms, garlic, oions, beef, tomato sauce and heavy cream'],
      cuisine: 'Brazilian',
      dishType: 'main_course',
      image: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fcybercook.com.br%2Freceitas%2Fcarnes%2Freceita-de-strogonoff-de-carne-14165&psig=AOvVaw01kuyDPAAMQ1LZzLCzwG7M&ust=1610734851374000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCPiiooyFnO4CFQAAAAAdAAAAABAD',
      duration: '40',
      creator: 'Dardannya Patente',
    });
  })
  .then(recipe => {
    console.log(recipe.title);
  })
  .then(recipes => {
  return Recipe.insertMany(data)
  })
  .then(recipes => {
    recipes.forEach(recipe => {
      console.log(`Recipe ${recipe.title} created!`)
    });
  })
  .then(() => {
    return Recipe.findOneAndUpdate( { title: 'Rigatoni alla Genovese'}, { duration: 100 });
  })
  .then(recipe => {
    console.log('The Italian Recipe was updated');
  })
  .then(() => {
    return Recipe.deleteOne( { title: 'Carrot Cake'} );
  })
  .then(recipe => {
    console.log('The Carrot Cake Recipe was deleted');

    return mongoose.disconnect();
  })
  .then(() => {
    console.log('Connection has been destroyed.');
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });
