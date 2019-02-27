const mongoose = require('mongoose')
const data = require('./data.js')

const Recipe = require('./models/Recipe.js')

  // Me conecto a la base de datos:
mongoose.connect('mongodb://localhost/recipeApp', { useNewUrlParser: true })
  .then(() => {
    console.log('Connected to Mongo!')
  }).catch(err => {
    console.error('Error connecting to mongo', err)
  })

  // Creo una nueva receta en la base de datos y muestro su title en consola: 
  .then(() => Recipe.create({ title: "Lentejas", level: "Amateur Chef", cuisine: "Spanish", dishType: "Dish"}))
  .then(recipe => { console.log(`La siguiente receta se ha creado en la base de datos: ${recipe.title}`) })
  .catch(err => { console.log('Algo malo ha pasado al crear una nueva receta:', err) })

  // Inserto un array de recetas desde data.js y muestro todos los titles en consola: 
  .then(() => Recipe.insertMany(data))
  .then((recipes => {
    console.log("Se ha guardado un array de recetas en la base de datos:")
    recipes.forEach(recipe => console.log(recipe.title))
    }))
  .catch((err)=> {console.log("Algo malo ha pasado al insertar un array de recetas:", err)} )

  // Update a una receta:
  .then(() => Recipe.updateOne({title: "Rigatoni alla Genovese"},{duration:100}))
  .then(success => {console.log("Se ha actualizado una receta con éxito")})
  .catch(err => console.log("Algo ha fallado al actualizar una receta:", err))
  
  // Borro una receta:
  .then(() => Recipe.deleteOne({title: "Carrot Cake"}))
  .then(success => {console.log("Se ha eliminado una receta con éxito")})
  .catch(err => console.log("Algo ha fallado al eliminar una receta:", err))

  // Me desconecto de la base de datos:
  .then(()=>mongoose.connection.close())
  .then(()=>console.log("Disconnected!"))
  .catch(err=>console.log("Error disconnecting:",err))