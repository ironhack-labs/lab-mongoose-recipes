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
  // .then((response) => {
  //   // Run your code here, after you have insured that the connection was made
  //   const recipeOne = { 
  //     title: "vegetable soup",
  //     level: "Easy Peasy",
  //     ingredients: ["carrots", "celery", "tomatoes", "green beans"],
  //     cuisine: "international",
  //     dishType: "soup",
  //     image: "https://www.cookingclassy.com/wp-content/uploads/2014/10/vegetable-soup-6-768x1152.jpg",
  //     duration: 40,
  //     creator: "unknown"
  //     // created: new Date("2014-10-22")
  //   }
  //   console.log("is working", response)
  //   return Recipe.create(recipeOne)
  // })
  .then(()=> {
    return Recipe.insertMany(data)
  })
  .then((response) => {
    response.forEach((recipe)=> {
      console.log(recipe.title)
    })
    return Recipe.findOneAndUpdate({title: "Rigatoni alla Genovese"}, {duration: 100})
  })
  .then(()=> {
    console.log("successful update")
    return Recipe.deleteOne({title: "Carrot Cake"})
  })
  .then(()=>{
    console.log("successful deletion")
    return mongoose.connection.close();
  })
  .then(()=> {
    console.log("DB closed")
    console.log(mongoose.connection.readyState);
  })
  .catch(error => {
    console.error('Error connecting to the database', error);

  });


