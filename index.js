/*require("dotenv").config()
const result = dotenv.config()
 
if (result.error) {
  throw result.error
} */


require("./config/db.config")
const mongoose = require('mongoose');

const process= require("process")
// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';



const recipe1 = {
  title: 'Tortilla de patatas',
  level: 'Easy Peasy',
  ingredients: ['4 Eggs','2 Big potatoes','1 onion','olive oil','salt'],
  cuisine: 'Spanish',
  dishType: 'main_course',
  image:'https://www.google.com/search?q=tortilla+de+patatas&sxsrf=ALeKk021sitVFfOyzVF_CikSYyClG4VqHw:1611605660917&source=lnms&tbm=isch&sa=X&ved=2ahUKEwjihL_38rfuAhVNilwKHRjFC20Q_AUoAXoECAwQAw&biw=1066&bih=1051#imgrc=Yi4C-LnByeMR9M' ,
  duration: 30,
  creator: 'Alicia',
  created: 25/01/2021
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

    //Insert one recipe
    Recipe.create(recipe1)
      .then(recipe => console.log('The Recipe is saved and its value is: ', recipe.title)) //Recipe is the model name
      .catch(error => console.log('An error happened while saving a new recipe:', error));

    //Insert many recipes from data array
    Recipe.insertMany(data)
      .then(data.forEach((element) => {console.log('The Recipe is saved and its value is: ', element.title)}))
      .catch(error => console.log('An error happened while saving a new recipe:', error)); 


  })

  .then(() => { 

    //Recipe update
      Recipe
      .updateOne({title:"Rigatoni alla Genovese"},{ duration: 100})
      .then(console.log(`The recipe has been updated `))
      .catch(error => console.log('An error happened while updating :', error));  
      
      
      Recipe
      .deleteOne({ title: 'Carrot Cake' })
      .then(() => console.log('The recipe has been deleted'))
      .catch(error => console.error(error))
  })

  
 

 

  
  .catch(error => {
    console.error('Error connecting to the database', error);
  });
