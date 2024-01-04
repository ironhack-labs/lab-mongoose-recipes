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
    // Run your code here, after you have insured that the connection was made
    return Recipe.create({
      title: "Pizza Margherita",
      level: "Amateur Chef",
      ingredients:["1 can of San Marzone tomatoes", "1 pound of pizza dough", "12 ounces of mozarella", "olive oil", "basil"],
      cuisine:"Italian",
      dishType: "main_course",
      image: "https://cookieandkate.com/images/2021/07/homemade-margherita-pizza.jpg",
      duration:"90",
      creator: "Raffaele Esposito"
    })
  })
  .then( (recipe)=>{
    console.log (recipe.title)
    return Recipe.create(data)
  })
  .then((recipes)=>{
    recipes.forEach((rec)=>{
      console.log(rec.title);
    })

    return Recipe.findOneAndUpdate({title:"Rigatoni alla Genovese"},{duration: 100})
  })
  .then((updatedRecipe)=> {
    console.log(`${updatedRecipe.title} was successfully updated :)`);
    
    return Recipe.deleteOne({title: "Carrot Cake"})
  })
  .then(()=>{
    console.log(`The recipe was successfully deleted :)`)
    
    mongoose.connection.close();
  })
  .then(()=>{
    console.log("DB successfully closed :)")
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });
