const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const datos = require('./data.json');

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
    Recipe.create({
      title: "Pollo a la crema",
      level: "Amateur Chef",
      ingredients: ["Un pollo","Salsa de tomate","sal","Jugo de Naranja"],
      cuisine: "Mexicana",
      dishType: "main_course",
      image: "https://images.media-allrecipes.com/userphotos/720x405/815964.jpg",
      duration: 30,
      creator: "Chef OroPesa"
    })
    .then( recipe => console.log("Una nueva receta",recipe))
    .catch(error=> console.log("Error al crear receta",error))
    
    Recipe.insertMany(datos)
    .then( data => console.log("Datos insertados correctamente",data))
    .catch(error=> console.log("Error al crear receta",error))
    
    Recipe.findOneAndUpdate({title:"Rigatoni alla Genovese"},{duration:100},{new:true})
    .then( recipe => console.log("Success!!",recipe))
    .catch(error=> console.log("Error al crear receta",error)) 
    
    Recipe.deleteOne({title:"Carrot Cake"})
    .then( recipe => console.log("Success delete", recipe))
    .catch(error=> console.log("Error al crear receta",error))
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });
/* Recipe.create({
  title: "Pollo a la crema",
  level: "Amateur Chef",
  ingredients: ["Un pollo","Salsa de tomate","sal","Jugo de Naranja"],
  cuisine: "Mexicana",
  dishType: "main_course",
  image: "https://images.media-allrecipes.com/userphotos/720x405/815964.jpg",
  duration: 30,
  creator: "Chef OroPesa"
})
.then( recipe => console.log("Una nueva receta",recipe))
.catch(error=> console.log("Error al crear receta",error))

Recipe.insertMany(datos)
.then( data => console.log("Datos insertados correctamente",data))
.catch(error=> console.log("Error al crear receta",error))

Recipe.findOneAndUpdate({title:"Rigatoni alla Genovese"},{duration:100},{new:true})
.then( recipe => console.log("Success!!",recipe))
.catch(error=> console.log("Error al crear receta",error)) 

Recipe.deleteOne({title:"Carrot Cake"})
.then( recipe => console.log("Success delete", recipe))
.catch(error=> console.log("Error al crear receta",error)) */