const mongoose = require('mongoose');
const Recipes = require('./models/Recipe'); // Import of the model Recipe from './models/Recipe'
const data = require('./data.js');  // Import of the data from './data.js'

// Connection to the database "recipeApp"
mongoose.connect('mongodb://localhost/recipesdb', { useNewUrlParser: true })
  .then(x => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`);
  }).catch(err => {
    console.error('Error connecting to mongo', err);
  });

Recipes.create({
  title: "Costillitas BBQ",
  level: "Easy Peasy",
  ingredients: [
    "Salsa BBQ",
    "Costillitas de Cerdo",
    "Tortillitas",
  ],
  cuisine: "Mexican",
  dishType: "Dish",
  image: "https://images.media-allrecipes.com/userphotos/720x405/815964.jpg",
  duration: 10,
  creator: "Chef tuti"
})
  .then(user => {
    console.log("The user is saved and its value is: ", user);
  })
  .catch(err => {
    console.log("An error happened:", err);
  });

  Recipes.insertMany(data);

  Recipes.updateOne({title:"Rigatoni alla Genovese"},{duration:100})
  .then(user =>{
    console.log("The recipe was modified succesfully");
    
  })
  .catch(err =>{
    console.log("An error happened: ",err);
    
  });

  Recipes.deleteOne({ title: "Carrot Cake" })
    .then(user => {
      console.log("the recipe was deleted succesfylly");
    })
    .catch(err => {
      console.log("An error happened:", err);
    });

    mongoose.connection.close(()=>{
      console.log("Conection is closed");
      
    })