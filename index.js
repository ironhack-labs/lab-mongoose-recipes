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
  .then(x => {console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
      Recipe.collection.drop() 
      })
  .catch(err => console.error('Error connecting to mongo', err))
  .then(x => {
    
    const firstRecipe =    {
      title: 'Orange and MIIlk-Braised Pork Carnitas',
      level: 'UltraPro Chef',
      ingredients: ['3 1/2 pounds boneless pork shoulder, cut into large pieces', '1 tablespoon freshly ground black pepper', '1 tablespoon kosher salt, or more to taste', '2 tablespoons vegetable oil', '2 bay leaves', '2 teaspoons ground cumin', '1 teaspoon dried oregano', '1/4 teaspoon cayenne pepper', '1 orange, juiced and zested'],
      cuisine: 'American',
      dishType: 'Dish',
      image: 'https://images.media-allrecipes.com/userphotos/720x405/2280918.jpg',
      duration: 160,
      creator: 'Chef John'
    }
  
    return Recipe.create(firstRecipe)})
  .then(recipe => console.log(`la primera receta es ${recipe.title} ha sido creado`))
  .catch(error => console.log(`se produjo un error ${error}`))
  .then(x=> Recipe.insertMany(data))
  .then(allRecipes=> console.log(`Todas las recetas han sido creadas, y son`, allRecipes))
  .catch(err => console.log(`hubo un error en insertmany de ${err}`))
  .then(x => Recipe.updateOne({title: "Rigatoni alla Genovese"}, {duration : 100}))
  .then(recipe => console.log(recipe))
  .catch(err => console.log(`Hubo un error de actualizacion tipo ${err}`))
  .then(x=> Recipe.deleteOne({title: `Carrot Cake`}))
  .then(recipe => {
    console.log(`La receta fue eliminada con exito`, recipe)
    mongoose.connection.close()
  })
  .catch(err=> console.log(`Hubo un error al eliminar la receta de ${err}`))

