const mongoose = require('mongoose');
// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify:false
  })
  .then(self => {
    console.log(`Connected to the database: "${self.connection.name}"`);
    // Before adding any documents to the database, let's delete all previous entries
    return self.connection.dropDatabase();
  })
 .then(() => {
   return Recipe.create({
     title:"Caserole",
     level: "Easy Peasy",
     ingredients:["potatoes","meat","tomatoes"],
     cuisine: "Colombian",
     dishType:"main_course",
     duration: 90,
     creator: "Milena"
   });
 }).catch(error => {
  console.error('Error connecting to the database', error);
})
 .then(recipe => {
   console.log('This is our newly created recipe:', recipe);
   return Recipe.insertMany(data)})
  .catch(error => {
    console.error('Error connecting to the database', error);
  })
  .then(recipes=>{
    console.log('This is our newly created recipes:',recipes)
    return Recipe.findOneAndUpdate(
      {title: "Rigatoni alla Genovese"},
      { duration: 100 },
      { new: true }
    );
  }).catch(error=>{console.error('Error connecting to the database', error);})
  .then(updatedRecipe =>{
    console.log("this was a Success",updatedRecipe)
    return Recipe.findOneAndDelete({title:"Carrot Cake" });})
    .then (deleteitem => {
      console.log('This is the Item we delete',deleteitem)
      mongoose.connection.close()
    })
  .catch(error=>{console.error('Error connecting to the database', error);});


  