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
  .then(x => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })
  .then(() => {
    try{
      main()
    }catch (error){
      console.log('Error', error)
    }
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });

  async function main() { 
    let newRecipe = {
      title: 'Crock Pot Chicken Taco Meat', 
      level: 'Easy Peasy',
      ingredients: ['Chicken Breast', 'Red Salsa', 'Homemade taco seasoning'],
      cuisine: 'Mexican',
      dishType: 'main_course',
      image: 'https://images.themodernproper.com/billowy-turkey/production/posts/2020/Crock-Pot-Chicken-Taco-Meat-6.jpg?w=667&auto=compress%2Cformat&fit=crop&dm=1603458701&s=620e8fec5d2002116393ef26212903b6',
      duration: 5,
      creator: 'themodernproper'
    };

    const createRecipe = await Recipe
      .create(newRecipe)
      .then(result => console.log("new recipe", result.title))
      .catch(error => console.log(error))

  
  }
