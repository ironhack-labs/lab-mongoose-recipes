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


  .then(async x => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)

 /*
const myRecipe = await Recipe.create({
  title: 'Papas',
  level: 'UltraPro Chef',
  ingredients: ['3 1/2 pounds boneless pork shoulder, cut into large pieces', '1 tablespoon freshly ground black pepper', '1 tablespoon kosher salt, or more to taste', '2 tablespoons vegetable oil', '2 bay leaves', '2 teaspoons ground cumin', '1 teaspoon dried oregano', '1/4 teaspoon cayenne pepper', '1 orange, juiced and zested'],
  cuisine: "Mexicana",
  dishType: "Other",
  duration: 30,
  creator: 'yo',
})

console.log(`Mi receta ${myrecipe.title}`)
*/

//Recipe.insertMany(data)

/*
await Recipe.find({},{title:1,_id:0})
.then(
  user => {
    //console.log(user)
    user.forEach( name =>{
      console.log(name.title)
    })
  }
) .catch(err => console.error('Error Recipe title 35', err));
*/

/*
await Recipe.updateOne({title : "Rigatoni alla Genovese"},{duration : 100})
.then(
  updateD =>{
    console.log(`Se Actualizo la receta`)
  }
).catch(err => console.error('Error al actualizar receta', err));
*/
/*

await Recipe.deleteOne({ title: "Carrot Cake" })
.then(
  menu =>{
    console.log(`La receta se elimino correctamente`)
  }
) .catch(err => console.error('Error al eliminar la receta', err));
*/
mongoose.connection.close( () => {
  console.log("Base de datos Cerrada")
  process.exit(0)
})
 })

  .catch(err => console.error('Error connecting to mongo', err));