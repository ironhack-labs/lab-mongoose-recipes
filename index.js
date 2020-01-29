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
  .then(x => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`);

    //Création d'une entrée recette
    const recipeNew = {
    title : "Parmentier de canard",
    level: "Amateur Chef",
    ingredients: ["canard", "pomme de terre", "pomme de terre douce"],
    cuisine: "FRANCAISE MOSSIEUR!",
    dishType: "Dish",
    duration: 30,
    creator: "Clémence Reiter"
    }

    Promise.all([Recipe.create(recipeNew), Recipe.insertMany(data)])
    .then(x => {

      Promise.all([Recipe.updateOne({ title: 'Rigatoni alla Genovese' }, { duration: 100 }), Recipe.deleteOne({ title: 'Carrot Cake' })])
      .then(x => {
        console.log("connection closed");
        mongoose.connection.close();
      })
      .catch(err => console.error('Error disconnecting from mongo', err));
      
    })
    .catch(err => console.error('Error in createOne or insertMany', err));
  })
  .catch(err => console.error('Error connecting to mongo', err));




  



  

  