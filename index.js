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
    return Recipe.deleteMany()
  })
  .then(() => {
  return Recipe.create({ title: 'pizza', level: 'Easy Peasy', ingredients: ['dough', 'tomato sauce', 'vegan cheese' ], cuisine: 'italian', dishType: 'main_course', image: null, duration: 20, creator: 'Vika' })
  })
  .then(() => {
    return Recipe.create(data)
  })
  .then((recipe) => {
    recipe.forEach(element => {
      console.log(element.title)
    });
  })
  .then(async () => {
    await Recipe.findOneAndUpdate({ title: "Rigatoni alla Genovese" }, { duration: 100 }, { new: true })
    .then(recipe => console.log(recipe))
    .catch(err => console.log(err))
  })
  .then(async () => {
    await Recipe.findOneAndDelete({ title: "Carrot Cake"})
        .then(cake => console.log(cake))
        .catch(err => console.log(err))
  })
  .then(() => {
    mongoose.connection.close();
    console.log("closed");
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  })
  