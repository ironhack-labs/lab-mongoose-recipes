const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then(x => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made
    const recipe1 = new Recipe({
      title: "Pollo al horno",
      level: 'Easy Peasy',
      ingredients: ['pollo', 'horno'],
      cuisine: 'hola',
      dishType: 'main_course',
      duration: 150,
      creator: 'Pepe',
    });
    return recipe1.save()
  })

  .then((recipe) => {
    console.log(recipe);
    return Recipe.insertMany(data)
  })

  .then((recipe) => {
    recipe.forEach((el) => console.log(el.title))
    return Recipe.findOneAndUpdate({ title: 'Rigatoni alla Genovese' }, { duration: 100 },{ new: true })
  })
  .then((changed) => {console.log('Changed -> ', changed)
  return Recipe.deleteOne({title: 'Carrot Cake'})
})

  

  .catch(error => {
    console.error('Error connecting to the database', error);
  })

  .finally(() => mongoose.disconnect())


