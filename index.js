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
  .then(x => console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`))
  .catch(err => console.error('Error connecting to mongo', err));

//adding one receipe using model.create
  // const oneRecipe = {
  //   title: 'Chocolate Chip Cookiesss',
  //   level: 'Amateur Chef',
  //   ingredients: ['1/2 cup light brown sugar', '1 large egg', '2 tablespoons milk', '1 1/4 teaspoons vanilla extract', '2 cups semisweet chocolate chips'],
  //   cuisine: 'French',
  //   dishType: 'Dish',
  //   image: 'https://images.media-allrecipes.com/userphotos/720x405/815964.jpg',
  //   duration: 30,
  //   creator: 'Chef Jennifer'
  // };

  // Recipe.create(oneRecipe)
  // .then(element =>{
  //   //console.log(element)
  // })
  // .catch(err =>{
  //   console.log("Error occured:", err)
  // })

// insert multiple recipes
  // Recipe.insertMany(data)
  // .then(data=>{
  //   data.forEach(element =>{
  //     console.log(element.title);
  //   })
  // })
  // .catch(err =>{
  //   console.log("Error occured:", err)
  // })

// Updating the recipes
  // Recipe.updateOne({title: "Rigatoni alla Genovese"}, {duration: 100})
  // .then(()=>console.log("Successfully updated the duration of Rigatoni alla Genovese"))
  // .catch(err =>{
  //   console.log("Error occured:", err)
  // })

//Removing a recipe
  // Recipe.deleteOne({title: "Carrot Cake"})
  // .then (()=> console.log("Carrot Cake has been deleted"))
  // .catch(err =>{
  //   console.log("Error occured:", err);
  // })

//Close the database connection
//mongoose.connection.close();


// insert multiple recipes
Recipe.insertMany(data)
.then(data=>{
  data.forEach(element =>{
    console.log(element.title);
  })
  return Recipe.updateOne({title: "Rigatoni alla Genovese"},{duration: 100})
})
.then(updatedOne =>{
  console.log("updated the duration of the specific")
  return Recipe.deleteOne({title: "Carrot Cake"})
})
.then(deleteRecipe =>{
  console.log("deleted a recipe");
})
.catch(err =>{
  console.log("Error occured:", err)
})