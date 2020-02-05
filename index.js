const mongoose = require('mongoose');
const Recipe = require('./models/Recipe.model'); // Import of the model Recipe from './models/Recipe.model.js'
const data = require('./data.js'); // Import of the data from './data.js'

// Connection to the database "recipeApp"
const recipe1 = {
  title: "Crema de verduras",
  level: "Easy Peasy",
  ingredients: ["Verduras al gusto", "Agua"],
  cuisine: "Mediterránea",
  dishType: "Dish",
  duration: 60,
  creator: "Carolina",
  created: Date.now(),
}
mongoose
  .connect('mongodb://localhost/recipe-app-dev', {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(x => console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`))
  .catch(err => console.error('Error connecting to mongo', err))
  .then(x => Recipe.collection.drop())
  .then(x => Recipe.create(recipe1))
  .then(theNewRecipe => console.log(`Ha sido creado el exquisito plato ${theNewRecipe.title}`))
  .catch(error => console.log(`Tio algo ha salido mal ha pasado ${error}`))
  .then(x => Recipe.insertMany(data))
  .then(dataArray => dataArray.forEach(elm => console.log(`El nombre de cada deliciosa receta es ${elm.title}`)))
  .catch(err => console.log(`Tio no he podido añadir las recetas por este error ${err}`))
  .then(x => Recipe.updateOne({
    title: "Rigatoni alla Genovese"
  }, {
    duration: 100
  }))
  .then(x => console.log(`Hemos cambiado con exito la receta`))
  .catch(err => console.log(`Madre mía no he podido cambiar la receta por este error ${err}`))
  .then(x => Recipe.deleteOne({
    title: "Carrot Cake"
  }))
  .then(x => console.log(`Se ha borrado con exito la receta`))
  .catch(err => console.log(`No se ha podido borrar la receta, está demasiado rica.`))
  .then(x => mongoose.connection.close())
  .then(x => console.log(`La conexión se ha cerrado con éxito rotundo`))
  .catch(err => console.log(`No se ha podido cerrar la conexion macho por este error ${err}`))










//   Cat.collection.drop()
// Cat.create({ name: 'Michifú' })
//     .then(theCat => console.log('El método .create() retorna el objeto de la BBDD:', theCat, 'El gato se llama', theCat.name))
//     .then(x => Cat.find({}))
//     .then(allTheCats => console.log("El método .find() retorna un Array", allTheCats))
//     .then(x => Cat.insertMany([{ name: 'Belcebú' }, { name: 'Garfield' }]))
//     .then(allNewCats => console.log("Los gatos nuevos son:", allNewCats))
//     .catch(err => console.log("Hubo un error!", err))