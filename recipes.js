const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const data = require('./data.js');

mongoose.connect('mongodb://localhost/recipeApp')
  .then(() => {
    console.log('Connected to Mongo!');
  }).catch(err => {
    console.error('Error connecting to mongo', err);
  });

  const Recipe = new Schema({
    title: { type: String, required: true, unique: true },
    level: { type: String, 
      enum: ['Easy Peasy', 'Amateur Chef', 'UltraPro Chef'], },
    ingredients: { type: Array },
    cuisine: { type: String, required: true },
    dishType: { type: String,
      enum: ['Breakfast', 'Dish', 'Snack', 'Drink', 'Dessert', 'Other'] },
    image: { type: String, default: 'https://images.media-allrecipes.com/images/75131.jpg' },
    duration: { type: Number, min: 0 },
    creator: { type: String },
    created: { type: Date, default: Date.now },    
  });

  
  const recipes = mongoose.model('recipes', Recipe);
  recipes.insertMany(data)
  .then(console.log("Insert success!"))
  .catch(console.log("Insert error!"));
  
  recipes.create({
    title: "Miojo de Frango",
    level: "Easy Peasy",
    ingredients: ["1 pacote de Miojo", "400ml de água"],
    cuisine: "Brasileira",
    dishType: "Dish",
    image: 'https://images.media-allrecipes.com/images/75131.jpg',
    duration: 3,
    creator: "Ronaldo Rodrigues da Silva",
    created: Date.now,
  })

  recipes.updateOne({title: "Rigatoni alla Genovese"}, { duration: 100})
  .then(console.log("Change success!"))
  .catch(console.log("Change error!"));

  recipes.remove({title: "Carrot Cake"})
  .then(console.log("Recipe removed"))
  .catch(console.log("Remove error!"));
