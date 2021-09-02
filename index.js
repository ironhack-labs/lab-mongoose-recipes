const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');
const newRecipe = {title: "Tortilla", level: "Easy Peasy", ingredients: ["eggs", "oil"], cuisine: "Spanish", dishType:"main_course", duration: 30, creator: "me"}
const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';
let i=0

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI, {
    // useCreateIndex: true,
    // useNewUrlParser: true,
    // useUnifiedTopology: true
  })
  .then(self => {
    console.log(`Connected to the database: "${self.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })
  .then(() => {
    //Iteration 2
    Recipe.create(newRecipe)
    .then(recipe => console.log('The recipe is saved and its title is: ', recipe.title))
    .catch(error => console.log('An error happened: ', error))
    //Iteration 3
    Recipe.insertMany(data)
    .then(recipe => 
      console.log('The recipe is saved '))
    // .catch(error => 
    //   console.log('An error happened: ', error))
     
    })
    .catch(error => {
      console.error('Error connecting to the database', error);
    });
  //3
  Recipe.find()
    .then(titlesRecipe => {
      titlesRecipe.forEach(recipe => console.log('Title :', recipe.title))
    })
  //4 setTimeout porq me cargaba antes que la llamada al documento en si.
setTimeout(() => {
       Recipe.findOneAndUpdate({title: 'Rigatoni alla Genovese'}, {duration: 100}, {new:true})
        .then(console.log('Duration time changed!'))
        .catch(error => console.log('Error', error))
     }, 1000);
  //Delete carrot cake
setTimeout(() => {
      Recipe.deleteOne({ title: 'Carrot Cake' })
      .then(recipe => console.log('Deleted!!!!!', recipe))
      .catch(error => console.log('Error, cant delete', error));
}, 1000);
