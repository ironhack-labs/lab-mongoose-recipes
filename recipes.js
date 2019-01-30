const mongoose = require('mongoose');
const Recipe = require('./models/Recipe.js');
const data = require('./data.js');

mongoose.connect('mongodb://localhost/recipeApp').then(() => {
  console.log('Connected to Mongo!');
}).catch((err) => {
  console.error('Error connecting to mongo', err);
});

Recipe.create({
  title: 'Brazilian Cuscuz',
  level: 'Amateur Chef',
  ingredients: ['1/2 corn', 'salt'],
  cuisine: 'Brazilian',
  dishType: ['Dish'],
  image: 'https://img.itdg.com.br/tdg/images/recipes/000/134/890/64027/64027_original.jpg?mode=crop&width=710&height=400',
  duration: 20,
  creator: 'Diego Ramos'
})
  .then((recipe) => {
    console.log(recipe.level);
  });

Recipe.insertMany([...data])
  .then((recipe) => {
    console.log(`${recipe[0].title} ok`);
    Recipe.findOneAndUpdate({ title: 'Rigatoni alla Genovese' }, { duration: 100 })
      .then((recipe) => {
        console.log(`${recipe.title} updated`);
        Recipe.findOneAndRemove({ title: 'Carrot Cake' })
          .then((recipe) => {
            console.log(`${recipe.title} removed`);

            mongoose.connection.close(() => {
              console.log('ENCERRADO');
            });
          });
      })
      .catch((err) => {
        console.log('an error happened: ', err);
      });
  });
