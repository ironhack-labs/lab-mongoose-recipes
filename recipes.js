const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const data = require('./data.js');

mongoose.connect('mongodb://localhost/recipeApp')
  .then(() => {
    console.log('Connected to Mongo!');
  }).catch(err => {
    console.error('Error connecting to mongo', err);
  });


  const SchemaRecipes = new Schema({
    title : String,
    level: { type: String, enum: ['Easy Peasy', 'Amateur Chef', 'UltraPro Chef'] },
    ingredientes: Array,
    cuisine: { type: String, required: true },
    dishType: { type: String, enum: ['Breakfast', 'Dish', 'Snack', 'Dring', 'Dessert', 'Other'] },
    image: {type: String, default:'https://images.media-allrecipes.com/im{ type:Date, default: today}ages/75131.j' },
    duration: { type: Number, min:0},
    creator: String,
    create: { type:Date, default: Date.now}
  });


  const Recipe = mongoose.model('Recipe',SchemaRecipes)

  Recipe.insertMany(data)
  .then( ()=>{
    Recipe.updateOne({ title: "Rigatoni alla Genovese"}, { duration: 100 })
    .then(() => {
      Recipe.deleteOne({ title: "Carrot Cake"})
        .then(()=>{mongoose.disconnect()} )
    })
  })



  
  // .then(console.log("Bien"))
  // .catch(console.log("Mal"));


  // Recipe.deleteOne({ title: "Carrot Cake"})
  // .then(console.log("Borrado"))
  // .catch(console.log("No borrado"));



  //mongoose.disconnect()
  
 