const mongoose = require('mongoose');
const Recipe = require('./models/Recipe'); // Import of the model Recipe from './models/Recipe'
const data = require('./data.js'); // Import of the data from './data.js'

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

// Connection to the database "recipeApp"
mongoose.connect('mongodb://localhost/recipeApp', {
    useNewUrlParser: true
  })
  .then(() => {
    console.log('Connected to Mongo!');
  }).catch(err => {
    console.error('Error connecting to mongo', err);
  });



function createRecipe() {
  Recipe.create({
    title: "Burger",
    level: "Easy Peasy",
    ingredients: ["bread", "burger patty", "ketchup", "cheese"],
    cuisine: "American",
    dishType: "Dish",
    image: "https://www.bbqlove.de/wp-content/uploads/2016/12/Fotolia_110973252_S.jpg",
    duration: 30,
    creator: "Marko & Sarah",
    created: 2019 - 09 - 05
  }).then((recipeNew) => {
    console.log("Recipe was created: ", recipeNew.title)
    console.log("Recipe was created: ", recipeNew.created)
  }).catch(err => {
    console.log("Error at creation: ", err);
  });
}


function insertRecipes() {
  Recipe.insertMany([
    ...data
  ]).then((data) => {
    for (let i = 0; i < data.length; i++) {
      console.log(data[i].title)
    }
  }).catch(err => {
    console.log("Error at creation: ", err);
  });
}


function updateRecipe() {
  Recipe.updateOne({
    title: "Rigatoni alla Genovese"
  }, {
    duration: 100
  }).then((data) => {
    console.log("Duration was successfully changed!")
  }).catch(err => {
    console.log("Error at creation: ", err);
  });
}


function deleteRecipe() {
  Recipe.deleteOne({
    title: "Carrot Cake"
  }).then((data) => {
    console.log("Recipe was deleted")
    mongoose.connection.close()
  }).catch(err => {
    console.log("Error at creation: ", err);
  });
}



mongoose.connection.on('connected', () => {
  createRecipe();
  insertRecipes();
  updateRecipe();
  deleteRecipe();
});