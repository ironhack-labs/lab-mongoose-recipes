const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const data = require('./data.js');
const Recipe = require('./model/recipes');

mongoose.connect('mongodb://localhost/recipeApp')
  .then(() => {
    console.log('Connected to Mongo!');
  });
let c1 = Recipe.create({ title: 'Chocolate Cake',
  level: 'Easy Peasy',
  ingredients: ['chocolate', 'flour', 'sugar', 'milk'],
  cuisine: 'American',
  dishType: 'Dessert',
  image: 'https://i2.wp.com/www.livewellbakeoften.com/wp-content/uploads/2017/04/Carrot-Cake-with-Cream-Cheese-Frosting-3-copy-300x300-1.jpg?resize=150%2C150&ssl=1',
  duration: 35,
  creator: 'Cristiana Yasuda'
})
  .then((rec) => {
    console.log('Recipe criada!', rec);
  }).catch(err => {
    console.error('Error connecting to mongo', err);
});

let c2 = Recipe.insertMany(data)
  .then((rec) => {
    console.log('Recipe criado!', rec);
  })
  .catch((err) => {
    console.log('Erro ao criar user', err);
  });

Promise.all([c1, c2])
  .then(() => {
    let u1 = Recipe.updateOne({ title: 'Rigatoni alla Genovese'}, { duration: 100 })
      .then((rec) => {
        console.log('Recipe criado!', rec);
      })
      .catch((err) => {
        console.log('Erro ao criar user', err);
      });

    let d1 = Recipe.deleteOne({ title: 'Carrot Cake' })
      .then((rec) => {
        console.log('Recipe delete!', rec);
      })
      .catch((err) => {
        console.log('Erro ao deletar', err);
      });

    Promise.all([u1, d1])
      .then(() => {
        mongoose.connection.close();
      })
      .catch(err => console.error(err));
  })
  .catch(err => console.error(err));    