const mongoose = require('mongoose');
const Recipe = require('./models/Recipe'); // Import of the model Recipe from './models/Recipe'
const data = require('./data.js');  // Import of the data from './data.js'

// Connection to the database "recipeApp"
mongoose.connect('mongodb://localhost/recipeApp', {
  useUnifiedTopology: true,
  useNewUrlParser: true
})
  .then(() => {
    console.log('Connected to Mongo!');
  }).catch(err => {
    console.error('Error connecting to mongo', err);
  });

  // Dog.create({
  //     name: 'minusuclo',
  //     age: 88,
  //     colors: ['red'],
  //     gender: 'female',
  //     phone: '003498984639'
  //   })
  //   .then(newDog => console.log(`El perro ${newDog.name} ha sido creado!: ${newDog}`))
  //   .catch(err => `Error al crear el perro: ${err}`)

Recipe.collection.drop()  
Recipe.create({title:"spaguetti",cuisine:"italian"})
.then(() => console.log("bummmmmmmm"))
  .then(x => Recipe.insertMany(data))
  .then(() => Recipe.find())
  .then( allTheRecipes => console.log(`The recipes are: ${allTheRecipes}`) )
  .then(x => Recipe.updateOne({title: "Rigatoni alla Genovese" }, { duration: 100 }))
  .then(()=>console.log("Yes, we did it"))
  .then(x => Recipe.deleteOne({ title: "Carrot Cake" }))
  .then(() => console.log("Yes, we eraised it"))
  .then(() => mongoose.connection.close())
  .catch(err=>{console.error("no funciono",err)})

// Recipe.insertMany(data)
//   .then(()=>console.log("funcionoooooooo todo se mete con data"))
//   .catch(err => {
//     console.error("no funcionoooooo", err)
//   })