const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const data = require('./data.js')

mongoose.connect('mongodb://localhost/recipeApp')
  .then(() => {
    console.log('Connected to Mongo!')
  }).catch(err => {
    console.error('Error connecting to mongo', err)
  });

const recipe = new Schema ({
  title: String, 
  level: String,
  ingredients: Array,
  cousine: String,
  dishType: String,
  image: String,
  duration: Number, 
  creator: String,
  created: Date 
});

const recipeModel = mongoose.model ('Recipe', recipe);

recipeModel.create ({ title:"Banana bread", 
level:"amateur Chef", 
ingredients:["4 mashed bananas", "Sugar", "250 gr. flour", "1 spoonful baking powder", "120 ml. milk", "3 eggs", "1 teaspoon vanilla extract", "1/2 teaspoon baking soda"],
cousine:"American",
dishType:"Dessert",
image: "https://www.cookingclassy.com/wp-content/uploads/2012/04/banana-bread-3-500x500.jpg",
duration: 50,
creator: "unknown",
created: '2018-06-30'
}); 

recipeModel.insertMany (data)
.then(()=>{console.log("datos insertados")})
.catch((e)=>{console.log(e)})

recipeModel.updateOne({title: "Rigatoni alla Genovese"}, {duration: 100})
  .then(()=>{console.log("Exito")})
  .catch((e)=>{console.log(e)})

recipeModel.deleteOne({title:"Carrot Cake"})
.then(()=>{console.log("ExitoAlRemover")})
  .catch((e)=>{console.log(e)})

mongoose.connection.on('disconnected',()=>{
  console.log("desconectado");
});