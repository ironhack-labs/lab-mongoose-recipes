const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';
const potatoOmelette = {
  title: 'Spanish Potato Omelette',
  level: 'Easy Peasy',
  ingredients: ["4 eggs", "1 onion", "1/2kg potatoes", "2 cups virgn oil", "salt"],
  cuisine: 'Spanish',
  dishType: 'main_course',
  image: 'https://lacocinadefrabisa.lavozdegalicia.es/wp-content/uploads/2019/05/tortilla-espa%C3%B1ola.jpg',
  duration: 40,
  creator: 'Unknown'
}
// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(self => {
    console.log(`Connected to the database: "${self.connection.name}"`);
    // Before adding any documents to the database, let's delete all previous entries
    return self.connection.dropDatabase();
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made
    Recipe.create(potatoOmelette)
      .then(newRecipe => console.log(`The recipe ${newRecipe.title} is saved`, newRecipe))
  })
  .then(() => Recipe.insertMany(data))

  .then((dataNew) => {
    dataNew.forEach((recipe) => console.log(`${recipe.title}`));
  })
  //Updating one receipe
  .then(() => Recipe.findOneAndUpdate({
    title: 'Rigatoni alla Genovese'
  }, {
    duration: 100
  }, {
    new: true
  }))
  .then(recipeUpdated => console.log(`${recipeUpdated.title} the new duration is: ${recipeUpdated.duration}`))
  .then(() => Recipe.deleteOne({
    title: 'Carrot Cake'
  }))
  //deleting the receipe
  .then(recipeDeleted => console.log(`The Carrot Cake has been removed from recipes`))
  .then(() => {
    console.log('Closing Mongoose');
    mongoose.connection.close();
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });