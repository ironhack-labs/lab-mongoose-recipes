const mongoose = require('mongoose');
const data = require('./data.js');
const Recipe = require('./models/Recipe.js');

function recipeCreate() {
  Recipe.create(
    { title: 'Recipe 1',
      level: 'Easy Peasy',
      ingredients: ['ingr1', 'ingr2', 'ingr3'],
      cuisine: 'recipeCountry',
      dishType: 'Dish',
      image: 'http://image.address',
      duration: 10,
      creator: 'Henrique' }
  )
    .then((rec) => {
      console.log('User Criado', rec.title);
    })
    .catch((err) => {
      console.error('Error connecting to mongo', err);
    });
}

function insertMany() {
  Recipe.insertMany(data)
    .then((rec) => {
      console.log('Dados inseridos com sucesso', rec.title);
    })
    .catch((err) => {
      console.log('erro ao inserir dados', err);
    });
}

function updateOneDuration(recTitle, recDuration) {
  Recipe.updateOne({ title: recTitle }, { duration: recDuration })
    .then((rec) => {
      console.log('Update Sucessful!', rec);
    })
    .catch((err) => {
      console.log('Error', err);
    });
}

function removeOneRecipe(recTitle) {
  Recipe.deleteOne({ title: recTitle })
    .then((rec) => {
      console.log('Data sucessfully removed!', rec);
    })
    .catch((err) => {
      console.log('Error', err);
    });
}

function closeDadatase() {
  mongoose.connection.close()
    .then(() => {
      console.log('Database closed!');
    })
    .catch((err) => {
      console.log('Error', err);
    });
}

mongoose.connect('mongodb://localhost/recipeApp')
  .then((usr) => {
    console.log('Connected to Mongo!', usr);
  }).catch((err) => {
    console.error('Error connecting to mongo', err);
  });

mongoose.connection.on('connected', () => {
  recipeCreate();
  insertMany();
  updateOneDuration('Rigatoni alla Genovese', 100);
  removeOneRecipe('Carrot Cake');
  closeDadatase();
});
