const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const data = require('./data.js')


const Recipe = new Schema({
  title : {type:String, required:true, unique:true},
  level: {type:String, enum:["Easy Peasy","Amateur Chef","UltraPro Chef"] },
  ingredientes  : Array,
  cousine: {type:String, required: true},
  dishType: {type:String, enum:["Breakfast", "Dish","Snack","Drink","Dessert","Other"]},
  image: {type:String, default:"https://images.media-allrecipes.com/images/75131.jpg."},
  duration: {type:Number, min:0},
  creator: String,
  created: {type:Date, default:Date.now},
});

const recipeModel = mongoose.model('Recipe', Recipe); //Receta va a usar el modelo
//recipeModel.create ({title:"Arroz con Leche",level:"Eassy Peassy",cousine:"Mexicana",})
mongoose.connect('mongodb://localhost/recipeApp')
  .then(() => {
    console.log('Connected to Mongo!')
  }).catch(err => {
    console.error('Error connecting to mongo', err)
  });
  
  
  recipeModel.insertMany(data, function(error,docs){});
  recipeModel.updateOne({ title: "Rigatoni alla Genovese"}, { duration: 100 })
  .then(() => {
    console.log('Updated!')
  }).catch(err => {
    console.error('Error', err)
  });

  recipeModel.deleteOne({title:"Carrot Cake"})
  .then(()=>{
    console.log("Deleted")
  }) .catch(err =>{
    console.error("Error", err)
  });

  mongoose.connection.close(() => { 
    console.log('Mongoose default connection disconnected through app termination'); 
    process.exit(0);
  }); 
