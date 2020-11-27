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
    Recipe.create({    
      title: 'Milanesa',
      level: 'Easy Peasy',
      ingredients: ['Filete de ternera', 'Pan rallado', 'Huevos'],
      cuisine: 'Argentina',
      dishType: 'main_course',
      image: 'https://t2.rg.ltmcdn.com/es/images/4/9/8/img_milanesa_de_carne_11894_600.jpg',
      duration: 30,
      creator: 'Chef',
      created: '2020-11-27'
    })
  
    .then(theNewRecipeCreated => {
      console.log('The new recipe is:', theNewRecipeCreated.title)
      return Recipe.insertMany(data)     
    })
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });
