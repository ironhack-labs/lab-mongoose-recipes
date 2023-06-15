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
    return Recipe.deleteMany();
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made
   const newRecipe = { 
      title: 'Cake',
      level: 'Easy Peasy',
      ingredients: ['sugar', 'milk', 'butter', 'flour', 'eggs', 'baking powder', 'vanilla extract'],
      cuisine: 'American',
      dishType: 'dessert',
      duration: 45,
      creator: 'Jane Doe',

     };
     return Recipe.create(newRecipe);
  })
  .then((response)=> {
    console.log(`Here is the ${response.title}`);
    return Recipe.insertMany(data);
  })
  .then ((response)=>{
    data.forEach((recipe)=> {
      console.log(`${recipe.title}`);
    })
  })
  .then ((response)=> {
    //console.log(data);
    return Recipe.findOneAndUpdate({title: 'Rigatoni alla Genovese'}, {duration: 100}, {new: true});
  })
  
  .then ((successMessage)=> {
    console.log("we set the duration to 100 successfully");
    console.log(successMessage);
  })

  .then (()=> {

    return Recipe.deleteOne({title: 'Carrot Cake'});
  })
  .then ((successMessage)=> {
    console.log("we delete Carrot Cake");
    console.log(successMessage);
    mongoose.connection.close();
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });


