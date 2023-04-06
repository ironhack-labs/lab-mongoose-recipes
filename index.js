const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

const newRecipe = { title: 'arroz a la cubana' ,
    level: 'Easy Peasy' ,
    ingredients: [ 'arroz', 'tomate', 'huevo' ] ,
    cuisine: 'supervivencia' ,
    dishType: 'main_course' ,
    image: 'https://cookpad.com/es/recipe/images/1fd87e5f9bc8b674' ,
    duration: 20 , 
    creator : 'Karlos Arguiñano' , };


console.log (data.json)

// Connection to the database "recipe-app"  
mongoose
  .set('strictQuery', true)
  .connect(MONGODB_URI)
  .then(x => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    return Recipe.deleteMany()
  })
  .then((recipeclean) => {
    return Recipe.create(newRecipe)
  .then(rec => console.log('The user is saved and its value is: ', Recipe))
  })
  // .then(() => {
  //   Recipe.insertMany()
  // })
  .catch(error => console.log('An error happened while saving a new user:', error));



  

