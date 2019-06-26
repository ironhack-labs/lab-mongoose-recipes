const mongoose = require('mongoose');
const Recipe = require('./models/Recipe'); // Import of the model Recipe from './models/Recipe'
const data = require('./data.js');  // Import of the data from './data.js'

mongoose.connect('mongodb://localhost/recipeApp3', { useNewUrlParser: true })
  .then(() => {
    console.log('Connected to Mongo!');
  }).catch(err => {
    console.error('Error connecting to mongo', err);
  });

const recipe1={
  title:"Quesadilla",
  level:"Easy Peasy",
  ingredients:["Queso","Tortilla"],
  cuisine:"gordon",
  dishType:"Breakfast",
  image:"https://upload.wikimedia.org/wikipedia/commons/7/75/Quesadilla_2.jpg",
  duration:3,
  creator:"Dios"
}
let a=Recipe.create(recipe1)
  .then((recipe)=>{
    console.log("Recipe create")
  })
  .catch((err)=>{
    console.log(err)
  })
let b=Recipe.create(data)
  .then(recipies=>{
    console.log("Lo lograste creaste " + recipies.length)
  })
  .catch(err=>{
    console.log(err)
  })
let c=Recipe.findOneAndUpdate({title:"Rigatoni alla Genovese"},{duration:100},{new:true} )
  .then((recipe)=>{
    console.log("Lo lograste")
  })
  .catch(err=>{
    console.log(err)
  })

  let d=Recipe.deleteOne({title:"Carrot Cake"})
    .then(recipe=>{
      console.log("Se borro")
    })
    .catch(recipe=>{
      console.log(err)
    })

    Promise.all([a,b,c,d])
    .then((hola)=>{
      mongoose.connection.close()
    })
    .catch(err=>{
      console.log(err)
    })
  
// Connection to the database "recipeApp"

