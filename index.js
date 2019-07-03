const mongoose = require('mongoose');
const Recipe = require('./models/Recipe'); // Import of the model Recipe from './models/Recipe'
const data = require('./data.js');  // Import of the data from './data.js'

// Connection to the database "recipeApp"
mongoose.connect('mongodb://localhost/recipeApp', { useNewUrlParser: true })
  .then(() => {
    console.log('Connected to Mongo!');

    // let recipe = {
    //   title: "Paella",
    //   level: "Easy Peasy",
    //   ingredients: ["shrimp", "chicken", "lemon", "salt", "onion", "garlic", "chorizo"],
    //   cuisine: "Spain",
    //   dishType: "Dish",
    //   image: "https://www.google.com/url?sa=i&source=images&cd=&ved=2ahUKEwiikIuPvZnjAhVLs1kKHboOAMwQjRx6BAgBEAU&url=https%3A%2F%2Fwww.tienda.com%2Frecipes%2Fseafood-paella.html&psig=AOvVaw3fx4v9oz_rkPc1Z1I_VT4I&ust=1562268299819520",
    //   duration: 30,
    //   creator: "Candido"
    // }

    // Recipe.create(recipe)
    //   .then(recipe => {
    //     console.log(recipe.title)
    //   })
    //   .catch(err => {
    //     console.log(err)
    //   })

    // Recipe.insertMany(data)
    //   .then(recipes => {
    //     recipes.forEach(recipe => {
    //       console.log(recipe.title)
    //     })
    //   })
    //   .catch(err => {
    //     console.log(err)
    //   })

    // Recipe.findOneAndUpdate({title: "Rigatoni alla Genovese"}, {duration: 100})
    //   .then(() => {
    //     console.log("Success")
    //   })  
    //   .catch(err => {
    //     console.log(err)
    //   })

    // Recipe.deleteOne({title: "Carrot Cake"})
    //   .then(recipe => {
    //     console.log("Success")
    //     console.log("Connection close")
    //     mongoose.connection.close()
    //   })
    //   .catch(err => {
    //     console.log(err)
    //   })


      
  }).catch(err => {
    console.error('Error connecting to mongo', err);
  });

