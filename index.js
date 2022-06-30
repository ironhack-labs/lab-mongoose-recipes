const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const dataArray = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then(x => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })
  .then(() => {
   
    return Recipe.create(dataArray[0])
  })
  .then(newRecipe =>{
    console.log(newRecipe)
    return Recipe.insertMany(dataArray)
  })
  .then(recipeResult => {
    recipeResult.forEach((element) => {

      console.log(element.title)
    })
    
  })
  // .then(newRecipe=>{
  //   newRecipe.forEach(element =>{
  //     console.log(element.title)
  //   })
  // })

  //4 - update recipe
  .then(() =>{
    return Recipe.findOneAndUpdate ({ title: 'Rigatoni alla Genovese' }, { duration: 100 })
  })
  .then(()=> console.log(`Rigatoni alla Genovese is updated!`))

//5 - remove recipe
.then(() =>{
  return Recipe.deleteOne ({title: 'Carrot Cake'})
})
.then(()=> console.log(`Carror Cake is updated!`))

  .catch(error => {
    console.error('Error connecting to the database', error);
  });

//close
mongoose.connect.close()
console.log(`connection closed!`)
