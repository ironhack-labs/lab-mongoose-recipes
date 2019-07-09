const mongoose = require('mongoose');
const Recipe = require('./models/Recipe'); // Import of the model Recipe from './models/Recipe'
const data = require('./data.js'); // Import of the data from './data.js'

// Connection to the database "recipeApp"
const iteration1 = mongoose.connect('mongodb://localhost/recipeApp', {
    useNewUrlParser: true
  })
  .then(() => {
    console.log('Connected to Mongo!');
  }).catch(err => {
    console.error('Error connecting to mongo', err);
  });

// iteration 2

const iteration2 = Recipe.create({
    title: '891239812398',
    level: 'Amateur Chef',
    ingredients: ['1/2 cup rice vinegar', '5 tablespoons honey', '1/3 cup soy sauce (such as Silver Swan®)', '1/4 cup Asian (toasted) sesame oil', '3 tablespoons Asian chili garlic sauce', '3 tablespoons minced garlic', 'salt to taste', '8 skinless, boneless chicken thighs'],
    cuisine: 'Asian',
    dishType: 'Dish',
    image: 'https://images.media-allrecipes.com/userphotos/720x405/815964.jpg',
    duration: 40,
    creator: 'Chef LePapu'
  })
  .then(recipe => {
    console.log('The recipe is saved and its value is: ', recipe)
  })
  .catch(err => {
    console.log('An error happened:', err)
  });

  
  // iteration 4

  const iteration4 = Recipe.update({
    title: 'Rigatoni alla Genovese'
  }, {
    duration: 100
  })
  .then(recipe => {
    console.log('The recipe is saved and its value is: ', recipe)
  })
  .catch(err => {
    console.log('An error happened:', err)
  });
  
  
  // iteration 5
  
  const iteration5 = Recipe.deleteOne({
    title: 'Carrot Cake'
  })
  .then(recipe => {
    console.log('deleted ', recipe)
  })
  .catch(err => {
    console.log('Oh my god', err)
  });
  
  //iteration 3
  
  const iteration3 = Recipe.insertMany(data)
    .then(() => {
      Recipe.update({
        title: 'Rigatoni alla Genovese'
      }, {
        duration: 100
      })
      .then(recipe => {
        console.log('The recipe is saved and its value is: ', recipe);
        Recipe.deleteOne({
          title: 'Carrot Cake'
        })
        .then(recipe => {
          console.log('deleted ', recipe)
        })
        .catch(err => {
          console.log('Oh my god', err)
        });
      })
      .catch(err => {
        console.log('An error happened:', err)
      });
    })
    .catch(err => {
      console.log('An error happened:', err)
    });

  // iteration 6
  Promise.all([iteration1, iteration2, iteration3])
  .then((res) => console.log(res))
  .catch((err) => console.log(err));