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
    const recipe1 = Recipe.create({
      title: 'IronBurguer',
      level: 'Easy Peasy',
      ingredients: ['bun', 'bacon', 'cheese', 'egg', 'patty'],
      cuisine: 'American',
      dishType: 'breakfast',
      duration: 20,
      creator: 'Fabricio & Vinicius'
    }).then(response => {
      console.log(`${response.title}`);
    }).catch(error => console.log(error));

    Recipe
      .insertMany(data)
      .then(response => {
        response.forEach(recipe => console.log(`${recipe.title}`))

        Recipe
          .findOneAndUpdate({
            title: 'Rigatoni alla Genovese'
          }, {
            duration: 100
          }, {
            new: true
          })
          .then(_ => {
            console.log('Updated!')
            Recipe
              .deleteOne({
                title: 'Carrot Cake'
              })
              .then(response => {
                console.log('Deleted!');
                mongoose
                  .connection
                  .close(function () {
                    console.log('Connection disconnected!')
                  });
              }).catch(err => console.log(err));
          })
          .catch(err => console.log(err));
      })
      .catch(err => console.log(err));
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });