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
  .then(async () => {
    // Run your code here, after you have insured that the connection was made
    const recipeArrumadinho = {
      title: 'Arrumadinho com Charque',
      level: 'Easy Peasy',
      ingredients: ['Cuscuz', 'Charque', 'Tomate', 'Cebola', 'Coentro'],
      cuisine: 'Brasileira',
      dishType: 'main_course',
      duration: 10,
      creator: 'Thiago Herculano'
    };

    try {
      const includeArrumadinho = await Recipe.create(recipeArrumadinho);
      console.log(includeArrumadinho.title);

      const newRecipeMany = await Recipe.insertMany(data);
      newRecipeMany.forEach(recipe => console.log(recipe.title));

      const updateRecipe = await Recipe.findOneAndUpdate({ title: 'Rigatoni alla Genovese'},{ $set: {duration: 100 }});
      console.log(`Verifição de código acima. O value de duration tem que ser 100 ==> ${updateRecipe.duration}`)

    } catch (error) {
      console.log(error)
    }

  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });
