const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model.js');
// Import of the data from './data.json'
const data = require('./data.json');

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
      title: 'Pato a la Naranja',
      level: 'Amateur Chef',
      ingredients: ['pato','licor de naranja','sal'],
      cuisine: 'Italiana',
      dishType: 'main_course',
      duration: 30,
      creator: "Chef OroPesa"
    })
    .then( recipe => console.log("Una nueva receta",recipe))
    .catch(error=> console.log("Error al crear receta",error))
    
    Recipe.insertMany(data)
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