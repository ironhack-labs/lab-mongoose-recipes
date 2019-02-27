const mongoose = require('mongoose');
const data = require('./data.js')

// Requerimos el modelo
const Recipe = require('./models/Recipe.js')

  

mongoose.connect('mongodb://localhost/recipeApp',{useNewUrlParser: true})
  .then(() => console.log(' 1 - Connected to Mongo!'))
  .catch(err => console.error('Error connecting to mongo', err))

  .then(()=>Recipe.create({ title: 'Prueba', cuisine: "WUNDERBAR"}))
  .then(recipe => { console.log(`2 - El titulo es: ${recipe.title}`) })
  .catch(err => { console.log('An error happened:', err) })

  .then(() => Recipe.insertMany(data))
  .then(recipe => { console.log(`3 - Añadimos varias recetas`) })
  .catch(err => { console.log('An error happened:', err) })

  .then(()=> Recipe.updateOne({title:'Rigatoni alla Genovese'},{duration:100}))
  .then(()=>console.log("4 - updating succeded"))
  .catch(err=>console.log("This is the error updating: ",err))

  .then(()=>Recipe.deleteOne({title:'Carrot Cake'}))
  .then(elm=>console.log(`5 - deleting succeded`))
  .catch(err=>console.log(`error happened because the entry was already deleted and the error was ${err}`))

  .then(()=>mongoose.connection.close())
  .then(()=>console.log("Connection with db closed"))
  .catch(err=>console.log("The error was:",err))



  
  /*
  Recipe.deleteMany({})
  .then(()=>console.log("borrado completado"))
  

  */