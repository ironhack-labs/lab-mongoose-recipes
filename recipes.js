const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const data = require('./data.js');
const Recipe = require('./models/recipe.js')

mongoose.connect('mongodb://localhost/recipeApp')
  .then(() => {
    console.log('Connected to Mongo!');
  }).catch(err => {
    console.error('Error connecting to mongo', err);
  });
Recipe.deleteMany()
.then(() => console.log("ALl was deleted"))
.catch((err)=> console.log(err))

  Recipe.create({title: "Guacamole", cuisine : "Mexican"})
  .then(recipe =>{console.log(`The recipe has been saved: ${recipe.title}`)})
  .then(() => Recipe.insertMany(data))
  .then(() => Recipe.updateOne({ title: "Rigatoni alla Genovese"}, {duration: 100}))
  .then(()=> Recipe.deleteOne({title:"Carrot Cake" }))
  .then(()=>mongoose.connection.close())
  .then(()=> console.log("Mongoose is discconected")) 
  .catch(err =>{console.log('A shit happened:',err)})

  
 

  // Recipe.insertMany(data)
  // .then(recipe =>{
  //   recipe.forEach((element) => {
  //     console.log(element.title)
  //   })
  //   console.log('Recipes have been added:', recipe)
  // })
  // .catch(err =>{console.log('An error happened:', err)})

  
// Recipe.updateOne({ title: "Rigatoni alla Genovese"}, {duration: 100})
// .then(recipe => {console.log('Succes')}) 
// .catch((err)=> {console.log(err)})