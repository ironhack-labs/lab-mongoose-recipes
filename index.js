const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

const newRecipe = {
  title: 'FAROFA DE BANANA',
  level: 'Easy Peasy',
  ingredients: [
    '1 ½ xícara (chá) de farinha de mandioca torrada',
    '2 bananas-prata',
    '½ cebola roxa',
    '1 dente de alho',
    '2 colheres (sopa) de manteiga',
    'sal e pimenta-do-reino moída na hora a gosto'
  ],
  cuisine: 'Brasileira',
  dishtype: 'acompanhamento',
  duration: 15,
}

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
    Recipe.create(newRecipe)
      .then(response => console.log(response.title))
      .catch(error => console.log('erro ao criar receita: ', error))

  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });
