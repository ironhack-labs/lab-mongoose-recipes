const mongoose = require('mongoose');


const Recipe = require('./models/Recipe.model');

const data = require('./data');

const MONGODB_URI = 'mongodb://127.0.0.1:27017/recipe-app';

const newRecipe = {
      title : "Pancakes",
      level : "Easy Peasy",
      ingredients : ["1 huevo","120g harina", "200 ml leche", "30ml aceite", "20g azucar","15g levadura"],
      cuisine : "Americanish",
      dishType : "breakfast",
      image : "https://recetasamericanas.com/wp-content/uploads/2012/01/5076901336_3995a30359_z.jpg",
      duration : 20,
      creator : "JC"
    }

mongoose
  .connect(MONGODB_URI)
  .then(x => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    return Recipe.deleteMany()
  })
  .then(() => {
    return Recipe.create(newRecipe)
  })
  .then (()=> {
    return Recipe.insertMany(data)  
  } ) 
  .then(() => {
    return Recipe.findOneAndUpdate({title: "Pancakes"},{duration : 30},{new : true})
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  })

  
  
