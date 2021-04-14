const mongoose = require('mongoose')

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model')

// Import of the data from './data.json'
const data = require('./data')

//Import of the made up racipe from './madeupData.json'
const oneRecipe = require('./madeupData')

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app'

// Connection to the database "recipe-app":
mongoose
  .connect(MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(self => {
    console.log(`Connected to the database: "${self.connection.name}"`)
    // Before adding any documents to the database, let's delete all previous entries:
    return self.connection.dropDatabase()
  })
  .then(() => {
    //Codigo de Teo:
    return Recipe.syncIndexes()
  })

  .then(() => {
    // console.log(data)
    //---------------Recipe promise start--------
    Recipe
      .create(oneRecipe) // Añadir una sola receta del archivo madeupData.json(1)
      
      .then(newRecipe => {
        console.log(`Se ha añadido la receta ${newRecipe.title} a la ddbb.`)
        return Recipe.insertMany(data) //Añadir todas las recetas del array del archivo data.json (5)
      })
    
      .then(newRecipes => {
        newRecipes.forEach(elm => {
          console.log(`Se ha añadido la receta ${elm.title} a la ddbb.`)
        })
        return Recipe.findOneAndUpdate({ title: "Rigatoni alla Genovese" }, { duration: 100 }, {new: true}) //Actualizar un objeto de la ddbb ("Rigatoni alla Genovese")
      })

      //Lo mas moderno habria sido usar Recipe.updateOne(), Recipe.findOneAndUpdate() esta 'deprecated'.
      //Con Recipe.updateOne() no podre acceder al objeto modificado, solo a un objeto nuevo con info de la operacion en si.
      .then(recipeUpdate => {
        console.log(`Succes! ${recipeUpdate.title}'s new duration is ${recipeUpdate.duration}.`)
        return Recipe.deleteOne({ title: "Carrot Cake" }) //Eliminar un objeto de la ddbb ("Carrot Cake")
      })

      .then(recipeDeletion => {
        console.log(`Succes! The recipe has been deleted:`, recipeDeletion)
        return mongoose.connection.close()
      })

      .catch(err => console.log('Data CRUD error:', err))
    //---------------Recipe promise end--------
  })

  .catch(error => {
    console.error('Error connecting to the database', error)
  })