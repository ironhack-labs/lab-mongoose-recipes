const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://127.0.0.1:27017/recipe-app';



// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then(x => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })
  .then(() => {
    Recipe
      .create({ title: 'Spaghetti Carbonara', level: 'Easy Peasy', ingredients: ['400g. spaghetti', '4 eggs', '150g. guanciale', '50g. parmigiano reggiano'], cuisine: 'italian', dishType: 'main_course', image: 'https://www.recetassinlactosa.com/wp-content/uploads/2015/06/Espaguetis-Carbonara-1.jpg', duration: 20, creator: 'David Muñoz' })
      .then(newRecipie => console.log('se ha creado:', newRecipie))
      .catch(err => console.log(err))

  })
  .then(() => {
    return Recipe.insertMany(data)
  })

  .catch(error => {
    console.error('Error connecting to the database', error);
  });
