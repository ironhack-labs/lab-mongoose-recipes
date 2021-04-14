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
  .then(() => {
    // Run your code here, after you have insured that the connection was made
    return Recipe.syncIndexes();
  })
  .then(() => {
    return Recipe
    .create({ title: 'Colacao', level: 'Easy Peasy', ingretidents: ['milk', 'colacao'],
     cuisine: 'mediterranean', dishType: 'drink',
     image: "https://ipmark.com/wp-content/uploads/2019/05/ColaCao_grumitos_5.jpg",
     duration: 2, creator: 'MrHose'})
    })
  .then(newRecipe => {
    console.log('Se ha añadido la receta:', newRecipe.title)
    return Recipe.insertMany(data)
  })
  .then(moreRecipes => {
    moreRecipes.forEach(all => console.log('Receta de:', all.title))
    return Recipe.findOneAndUpdate({title: 'Rigatoni alla Genovese'}, {duration: 100}, { new: true })
  })
  .then(fixRecipe => {
    console.log('Se ha actualizado correctamente la receta:', fixRecipe.title)
    return Recipe.findOne({ title: 'Carrot Cake'})
  })
  .then(remRecipe => {
    return Recipe.deleteOne(remRecipe)
  })
  .then(info => {
    console.log('Este es un mensaje informativo sobre la eliminacion de receta:', info)
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });
