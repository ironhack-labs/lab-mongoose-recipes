const mongoose = require('mongoose');
const Recipe = require('./models/Recipe'); // Import of the model Recipe from './models/Recipe'
const data = require('./data.js');  // Import of the data from './data.js'

// Connection to the database "recipeApp"
mongoose.connect('mongodb://localhost/recipeApp', { useNewUrlParser: true })
  .then(() => {
    console.log('Connected to Mongo!');
  }).catch(err => {
    console.error('Error connecting to mongo', err);
  });


  //CREATE/INSERT A INDIVIDUAL INSTANCE OF RECIPE MODEL TO DATABASE (MONGODB)
Recipe.create({
  title: "Bolognesa Pasta",
  level: "Easy Peasy",
  ingredients: ["Sauce", "Meat", "Cheese", "Pasta"],
  cuisine: "yes",
  dishType: "Dish",
  image: "https://www.conmishijos.com/thumbs/posts/9000/9805-espaguetis-a-la-bolonesa-receta-tradicional-italiana_460x345r.jpg",
  duration: 30,
  creator: "Linguini"
})
.then(newRecipe => console.log("A new Recipe was created: ", newRecipe.title))
.catch(err => console.log("Error while creating a Recipe! ", err))

//INSERT AN ARRAY OF DATA OF RECIPE MODEL TO DATABASE (MONGODB)
Recipe.insertMany(data)
.then(newRecipe => console.log(newRecipe.forEach(eachRecipe => console.log("A new Recipe was created: ", eachRecipe.title))))
.catch(err => console.log("Error while creating a Recipe! ", err))

//UPDATE AN SPECIFIC OBJECT BY ITS TITLE FROM DATABASE (MONGODB)
Recipe.updateOne({title: "Rigatoni alla Genovese"}, {duration: 100})
.then(console.log("The next Recipe was successfully changed!"))
.catch(err => console.log("Something went wrong while updating ", err))

//DELETE A SPECIFIC OBJECT BY ITS TITLE FROM DATABASE (MONGODB)
Recipe.deleteOne({title: "Carrot Cake"})
.then(console.log("The next Recipe was successfully deleted"))
.catch(err => console.log("Something went wrong while deleting ", err))
