const mongoose = require('mongoose');
const recipe = require('./model/schema-recipes.js');
const data = require('./data.js');

mongoose.connect('mongodb://localhost/recipeApp')
  .then(() => {
    console.log('Connected to Mongo!');
  }).catch((err) => {
    console.error('Error connecting to mongo', err);
  });

const c1 = recipe.create({
  title: 'Bread with egg',
  level: 'Easy Peasy',
  ingredients: ['bread', 'egg'],
  cuisine: '3m',
  dishType: 'Breakfast',
  image: 'http://www.saudenarotina.com.br/wordpress/wp-content/uploads/2013/09/pao_com_ovo_saudenarotina.jpg',
  duration: 5,
  creator: 'Ilara Almeida'
})
  .then((usr) => {
    console.log('Recipe created!', usr);
  })
  .catch((err) => {
    console.log('Error creating revenue', err);
  });

const c2 = recipe.insertMany(data)
  .then((usr) => {
    console.log('Data Inserted!', usr);
  })
  .catch((err) => {
    console.log('Error creating Data', err);
  });

Promise.all([c1, c2])
  .then(() => {
    const u1 = recipe.updateOne(
      { title: 'Rigatoni alla Genovese' },
      { duration: 100 }
    )
      .then((usr) => {
        console.log('Update ok!', usr);
      })
      .catch((err) => {
        console.log('Error Update', err);
      });
    const d1 = recipe.deleteOne(
      { title: 'Carrot Cake' }
    )
      .then((usr) => {
        console.log('Delete ok!', usr);
      })
      .catch((err) => {
        console.log('Error Delete', err);
      });
    Promise.all([u1, d1])
      .then(() => {
        mongoose.connection.close();
      })
      .catch(err => console.error(err));
  })
  .catch(err => console.error(err));
