
const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const data = require('./data.js')


mongoose.connect('mongodb://localhost/recipeApp')
  .then(() => {
    console.log('Connected to Mongo!')
  }).catch(err => {
    console.error('Error connecting to mongo', err)
  });

  
  const recipeSchema = new Schema ({
    title: {type: String, required: true, unique: true},
    level: {type: String, enum: ["Easy Peasy", "Amateur Chef", "UltraPro Chef" ]},
    ingredients: {type: Array},
    cuisine: {type: String, required: true},
    dishType: {type: String, enum: ["Breakfast", "Dish", "Snack", "Drink", "Dessert", "Other"]},
    image: {type: String, default: "https://images.media-allrecipes.com/images/75131.jpg"},
    duration: {type: Number, min: 0},
    creator: {type: String},
    created: {type: Date, default: Date.now}

  })

  const Recipe = mongoose.model("Recipe", recipeSchema);

  const PatesRecipe = new Recipe ({
    title: "Pates aux beurre",
    level: "Easy Peasy",
    ingredients:["Pates", "beurre", "salt", "pepper"],
    cuisine: "Family dish",
    dishType: "Dish",
    duration: 15,
    creator: "Renaud"
  });
  
const iteration1 = 
  PatesRecipe.save()
  .then ((arg) => {
     console.log(arg.title);
  })
  .catch ((err) => {
    console.log("ERROR ", err);
  });

const iteration2 = 
  Recipe.insertMany(data)
  .then ((arg) => {
     console.log(arg.title);
  })
  .catch ((err) => {
    console.log("ERROR ", err);
  });

const iteration3 = 
  Recipe.updateOne({title: "Rigatoni alla Genovese"}, {duration : 100})
  .then(() => {
    console.log('Duration Updated!')
  }).catch(err => {
    console.error('ERROR duration NOT updated ', err)
  });

const iteration4 = 
  Recipe.remove({title: "Carrot Cake"})
  .then(() => {
    console.log('Cake Removed!')
  }).catch(err => {
    console.error('ERROR Cake NOT REMOVED ', err)
  });

  Promise.all([iteration1, iteration2, iteration3, iteration4])
  
  .then (() => {
      console.log("DataBase Closed!");
      mongoose.connection.close();
  })
  .catch ((err) => {
    console.log("ERROR DataBase NOT Closed ", err);
  });

  