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
  .then((self) => {
    console.log(`Connected to the database: "${self.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    self.connection.dropDatabase();
    // inserindo receita de PUDIM
    Recipe.create([pudim])
      .then(() => {
        console.log('Criado:', pudim.title);

        // inserindo array de receitas do data.json
        Recipe.insertMany(data)
          .then((receitas) => {
            receitas.forEach((elem) =>
              console.log('CRIOU VARIOS:', elem.title)
            );

            // UPDATE
            Recipe.findOneAndUpdate(
              { title: 'Rigatoni alla Genovese' },
              { duration: 100 },
              { new: true }
            )
              .then((response) => {
                console.log(response);
                // DELETE
                Recipe.deleteOne({ title: 'Carrot Cake' })
                  .then((response) => {
                    console.log(response);
                    mongoose.disconnect();
                  })
                  .catch((error) => console.log(error));
              })
              .catch((error) => console.log(error));
          })
          .catch((error) => console.log(error));
      })
      .catch((error) => console.log(error));
  })
.catch((error) => {
  console.error('Error connecting to the database', error);
});

const pudim = new Recipe({
title: 'Pudim',
level: 'Easy Peasy',
ingredients: ['leite consensado', 'leite integral', 'ovos', 'açucar refinado'],
cuisine: 'Brasileira',
dishType: 'Dessert',
image:
  'https://img.itdg.com.br/tdg/images/recipes/000/031/593/318825/318825_original.jpg?mode=crop&width=710&height=400',
duration: 60,
creator: 'Phelipe'
});