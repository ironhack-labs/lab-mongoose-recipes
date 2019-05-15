const mongoose = require('mongoose');
const Recipe = require('./models/Recipe'); // Import of the model Recipe from './models/Recipe'
const data = require('./data.js');  // Import of the data from './data.js'

// Connection to the database "recipeApp"
mongoose.connect('mongodb://localhost/recipeApp', { useNewUrlParser: true })
  .then(() => {
    console.log('Connected to Mongo!');
    addNewRecipe()
  }).catch(err => {
    console.error('Error connecting to mongo', err);
  });




const addNewRecipe = () => {
  Recipe.create({
    title: "Tortilla de patatas Mejorada", level: "Easy Peasy", ingredients: ["huevos", "patatas", "aceite", "sal"], cuisine: "mediterranea", dishType: "Dish", image: undefined, duration: 60, creator: "Cris y Lu", created: undefined
  })
    .then(recipe => {
      console.log(recipe.title)
      manyRecipes()
    })
    .catch(err => { console.log('An error happened:', err) });

}


const manyRecipes = () => {
  Recipe.insertMany(data)
    .then((recipes) => {
      recipes.forEach(batman => console.log(batman.title))
      updateRecipe()
    })
    .catch(err => { console.log("An error happened", err) })

}



const updateRecipe = () => {
  Recipe.updateOne({ title: "Rigatoni alla Genovese" }, { duration: 100 })
    .then(() => {
      console.log("se ha actualizado correctamente yujujuuu!")
      deleteRecipe()
    })
    .catch(err => { console.log('An error happened:', err) });

}

const deleteRecipe = () => {
  Recipe.deleteOne({ title: "Carrot Cake" })
    .then(() => {
      console.log("se ha borrado correctamente yujujuuu!")
      disconnectMongoose()
    })
    .catch(err => { console.log('An error happened:', err) });

}

const disconnectMongoose = () => {
  mongoose.connection.close(function () {
    console.log('Mongoose default connection closed');
  });
}










