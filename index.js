const mongoose = require('mongoose');
const Recipe = require('./models/Recipe.model'); // Import of the model Recipe from './models/Recipe.model.js'
const data = require('./data.js'); // Import of the data from './data.js'

const extraRecipe = new Recipe({title:'Rissoto di la mama', level: 'Amateur Chef', cuisine: "Mediterranean", ingredients: ['Mango','Milk', 'Rice']});

// Connection to the database "recipeApp"
mongoose
  .connect("mongodb://localhost/recipe-app-dev", {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false  //If I do not enter this line, I get a message indicating deprecation with the findAndUpdate method
  })
  .then(x => console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`))
  .then(Recipe.collection.drop())
  .then(()=>{
    return Recipe.create(extraRecipe) //adding a new recipe(created by us and following the model)
    .then(console.log("New Recipe " +extraRecipe.title+ " saved"))
  })
  .then(()=>{
    return Recipe.insertMany(data)  //importing the data
    .then(console.log("Recipes added without problems"))
  })
  .then(()=>{
    return Recipe.findOneAndUpdate({title:"Rigatoni alla Genovese"}, {$set: {duration: 100}},{returnNewDocument: true})  //importante el return(si no, no funcionaba)
    .then(console.log("Recipe updated"))
    //Recipe.save()
  })
  .then(()=>{
    return Recipe.deleteOne({title: 'Carrot Cake'})  //deleting the document filtered
      .then(console.log("Deleted correctly"))
  })
  .catch(err => console.error('Error connecting to mongo', err))
  .finally(()=> {
    mongoose.connection.close()
    .then(console.log("Database closed correctly"))
  })
  