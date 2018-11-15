const mongoose = require('mongoose');
const data = require('./data.js');
const Recipe = require('./models/RecipeSchema');


mongoose.connect('mongodb://localhost/recipeApp')
  .then(() => {
    console.log('Connected to Mongo!');
    return Recipe.collection.drop()
      .then(() => Recipe.create({
        title: 'La cuisine',
        level: 'Amateur Chef',
        ingredients: ['1/2 cup rice vinegar', '5 tablespoons honey', '1/3 cup soy sauce (such as Silver Swan®)', '1/4 cup Asian (toasted) sesame oil', '3 tablespoons Asian chili garlic sauce', '3 tablespoons minced garlic', 'salt to taste', '8 skinless, boneless chicken thighs'],
        cuisine: 'Asian',
        dishType: ['Dish'],
        image: 'https://images.media-allrecipes.com/userphotos/720x405/815964.jpg',
        duration: 60,
        creator: 'Chef Super Pro',
      })
        .then(recipe => console.log('The recipe has been created: ', recipe.title))
        .catch(err => console.log('Error create: ', err)))

      .then(() => Recipe.insertMany(data)
        .then(recipe => recipe.forEach(elem => console.log('The recipe is created and it is: ', elem.title)))
        .catch(err => console.log('Error insertMany: ', err)))

      .then(() => Recipe.updateOne({ title: 'Rigatoni alla Genovese' }, { duration: 100 })
        .then(() => console.log('Duration of Rigatoni updated'))
        .catch(err => console.log('Error updateOne: ', err)))

      .then(() => Recipe.deleteOne({ title: 'Carrot Cake' })
        .then(() => console.log('Carrot Cake removed'))
        .catch(err => console.log('Error deleteOne: ', err)))

      .then(() => mongoose.connection.close()
        .then(() => console.log('Connection closed'))
        .catch(err => console.log('Error on connection close', err)));
  })

  .catch((err) => {
    console.error('Error connecting to mongo', err);
  });
