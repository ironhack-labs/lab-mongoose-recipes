const mongoose = require('mongoose');
const Recipe = require('./models/Recipe'); // Import of the model Recipe from './models/Recipe'
const data = require('./data.js'); // Import of the data from './data.js'

let options = { 
  useNewUrlParser: true,  
  useUnifiedTopology: true 
};

// Connection to the database "recipeApp"
mongoose.connect('mongodb://localhost:27017/recipeApp', options)
.then(() => {
  console.log('Connected to Mongo!');
}).catch(err => {
  console.error('Error connecting to mongo', err);
});

let newRecipe = {
  title: 'Pastel de Nata',
  level: 'Easy Peasy',
  ingredients: ['Eggs', 'Sugar', 'Salt'],
  cuisine: 'Portuguese',
  dishType: 'Dessert',
  image: 'https://i.blogs.es/140694/natas1/450_1000.jpg',
  duration: 45,
  creator: 'Gonçalo Elísio'
};

let createPromise = Recipe.create(newRecipe)
  .then(PastelDeNata => {
    console.log('Pastel de Nata created successfully');
    return Promise.resolve();
  })
  .catch((error) => {
    console.log("Err", error);
  })

let createManyPromise = Recipe.insertMany(data)
  .then((recipe) => {
    console.log("Inserted all recipes successfully");
    return Promise.resolve();
  })
  .then ((recipe)=>{
    console.log('updated successfully')
    return Recipe.findOneAndUpdate({
      'title': 'Rigatoni alla Genovese'
    }, {
      'duration': 100
    })
  })
  .then((recipe) => {
    console.log('Deleted successfully');
    return Recipe.deleteOne({title: "Carrot Cake"})
  })
  .catch((error) => {
    console.log("Err", error);
  })
  

Promise.all([createPromise, createManyPromise])
  .then((results)=>{
    return mongoose.connection.close()
  })
  .then(()=> {
    console.log("Closed connection")
  })