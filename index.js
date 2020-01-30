const mongoose = require('mongoose');
const Recipe = require('./models/Recipe.model'); // Import of the model Recipe from './models/Recipe.model.js'
const data = require('./data.js'); // Import of the data from './data.js'

// Connection to the database "recipeApp"
mongoose
  .connect('mongodb://localhost/recipe-app-dev', {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(x =>console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`))
  .catch(err => console.error('Error connecting to mongo', err));
  
  let TortaCubana=[{
    title:"Torta Cubana",
    level:"Amateur Chef",
    ingredients:["Torta","Salchicha","Milaneza","Jitomate","Aguacate","Queso Amarillo",
     "QUeso blanco","Mayoneza","Rajas Verdes","Mantequilla"],
     cuisine: "Mexicana",
    dishType:"Breakfast",
    duration:"30",
    creator:"Santiago Gonzalez" 
  }]
  
 Recipe.create(TortaCubana).then(recipe => {
 	console.log(recipe[0].title)
    Recipe.insertMany(data).then(insertedRecipe => {
        data.forEach(data =>{console.log(data.title)})
        Recipe.updateOne({title: "Rigatoni alla Genovese"}, {duration: 100}).then(updatedRecipe => {
            console.log("Exito Al Cambiar Duracion")
            Recipe.deleteOne({title: "Carrot Cake"}).then(deletedRecipe => {
                console.log("CaḰe Eliminado")
                mongoose.disconnect()
            }).catch(err => console.log("Error al eliminar elemento"+err))
        }).catch(err => console.log("Error Cambio de Duracion"+err))
    }).catch(err => console.log("Data no insertada")+err)    
 }).catch(err => console.log("Receta No creada")+err)
            
        
          
    