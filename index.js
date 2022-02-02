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
  .then(() => {
    console.log('CONECTADO')
    
    return Recipe
    .create({title:'Fajitas de pollo', level:'Easy Peasy', ingredients:['Pimiento rojo y/o verde',
    'Cebolla',
    'Pechuga de pollo',
    'Pimentón dulce o picante',
    'Comino molido',
    'Limas',
    'Sal y pimienta',
    'Aceite de oliva',
    'tortillas de trigo',
    'Queso rallado'],
    cuisine: 'Mexicanas',
    dishType: 'main_course',
    image:'https://www.pequerecetas.com/wp-content/uploads/2011/05/fajitas-de-pollo-1.jpg',
    duration:40,
    creator:'Rosita de Todos los Santos',
    created: 1942/01/01
  })
})
  .then(recipe=>{
    console.log(recipe.title)
    return Recipe.create(data)
})
  .then(newRecipes => {
    newRecipes.forEach(eachRecipe=>{
      console.log(eachRecipe.title)
    })
    return Recipe.findOneAndUpdate({title:'Rigatoni alla Genovese'}, {duration:100}, {new:true})
  })
  .then(recipeUpdated => {
    console.log(recipeUpdated)
    return Recipe.deleteOne({name:'Carrot Cake'})
  })
  .then(()=>{
    mongoose.connection.close()
    console.log('Closed Conection')
  })

  
  .catch(error => {
    console.error('Error connecting to the database', error);
  });
  
  