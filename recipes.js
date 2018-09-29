const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const data = require('./data.js');
const RecipeSchema = require('./models/RecipeSchema');

mongoose.connect('mongodb://localhost/recipeApp')
  .then(() => {
    console.log('Connected to Mongo!')
  }).catch(err => {
    console.error('Error connecting to mongo', err)
  });

//SEGUNDA ITERACION
const recipeTitle = new RecipeSchema({
  title: "Huevos con chorizo",
  cousine: "Mexicana"
})

function createNewRecipe() {
  recipeTitle.save()
    .then(res => {
      console.log(res.title)
    })
    .catch(err => {
      console.log(err)
    })
}
//createNewRecipe();


//CREATE - TERCERA ITERACION
function create(data) {
  RecipeSchema.insertMany(data)
    .then(res => {
      res.forEach(e => {
        console.log(e.title)
      });
    })
    .catch(error => {
      console.log(error)
    })
}
 create(data)

//UPDATE - CUARTA ITERACION
function updateRecipeDuration(title, duration) {
  RecipeSchema.updateOne({
      title: title
    }, {
      duration: duration
    })
    .then(res => {
      console.log("Sucess message ok!:", res)
    })
    .catch(error => {
      console.log(error);
    })
}

//updateRecipeDuration("Rigatoni alla Genovese",100)

//REMOVE RECIPE - QUINTA ITERACION
function deleteOneRecipe(title) {
  RecipeSchema.remove({
      title: title
    })
    .then(res => {
      console.log(res)
    })
    .catch(error => {
      console.log(error)
    })
}
//deleteOneRecipe("Carrot Cake")

//CERRAR BASE DE DATOS - SEXTA ITERACION
  process.on('SIGINT', () => {  
    mongoose.connection.close(() => { 
      console.log('Mongoose default connection disconnected through app termination'); 
      process.exit(0); 
    }); 
  }); 


