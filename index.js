const mongoose = require('mongoose');
const Recipe = require('./models/Recipe.model'); // Import of the model Recipe from './models/Recipe.model.js'
const data = require('./data.js'); // Import of the data from './data.js'

// Connection to the database "recipeApp"
mongoose
  .connect('mongodb://localhost/recipe-app-dev', {
    // useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(x => console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`))
  .catch(err => console.error('Error connecting to mongo', err))
  .then(() => Recipe.collection.drop())
  .then(x => {
    const recipe1 = {
      title: 'Pollo Tika-Masala',
      level: 'Amateur Chef',
      ingredients: ["pollo", "curry", "leche de coco", "almendras", "agua", "comino", "arroz"],
      cuisine: 'India',
      dishType: 'Dish',
      image: 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/delish-chicken-tikka-masala-jpg-1526059261.jpg?resize=980:*',
      duration: 40,
      creator: 'Tika Masala'
    }
    return recipe1
  })
  .then(recipe1 => Recipe.create(recipe1))
  .then(newRecipe => console.log(`Nuestra receta es ${newRecipe.title}`))
  .then(() => Recipe.insertMany(data))
  .then(newRecipes => newRecipes.forEach(element => console.log(`Añadido ${element.title}`)))
  .then(() => Recipe.updateOne({
    title: 'Rigatoni alla Genovese'
  }, {
    duration: 100
  }))
  .then(updateInfo => updateInfo.nModified ? console.log("Updated Successfully") : console.log("Updated Failed"))
  .then(() => Recipe.deleteOne({
    title: 'Carrot Cake'
  }))
  .then(deleteInfo => deleteInfo.deletedCount ? console.log("Deleted Successfully") : console.log("Deleted Failed"))
  .then(() => mongoose.connection.close())
  .catch(error => console.log(`Se produjo un error: ${error}`))