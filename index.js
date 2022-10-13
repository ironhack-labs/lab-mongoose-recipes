const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');
const { db } = require('./models/Recipe.model');

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
    return Recipe.create({
        title: "Tortilla de patatas",
        level: "UltraPro Chef",
        ingredients: ["Huevos", "Patatas", "Cebolla"],
        cuisine: "Española",
        dishType: "main_course",
        image: "https://img2.rtve.es/i/?w=1600&i=1606754179280.jpg",
        duration: 30,
        creator: "Yago",
        created: Date("2002/02/05")
    })
  })
  .then((response) => {
    console.log(response.title);
    return Recipe.insertMany(data)
  })
  /*
  .then((response) => {
    response.forEach((eachRecipe) => {
      console.log(eachRecipe.title)
    })
  })
  
  .then(() => {
    console.log("duración modificada")
    return Recipe.findOneAndUpdate({title: "Rigatoni alla Genovese"}, {duration: 100})
    
  })
  
 .then(() => {
  console.log("eliminando Carrot Cake")
  return Recipe.deleteOne({title: "Carrot Cake"})
 })
 */
.then(() => {
  console.log("Cerrando base de datos")
  //db.close() //?????
   mongoose.connection.close() 

})

  .catch(error => {
    console.error('Error connecting to the database', error);
    
  });
