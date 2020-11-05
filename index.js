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
    useUnifiedTopology: true
  })
  .then(self => {
    console.log(`Connected to the database: "${self.connection.name}"`);
    // Before adding any documents to the database, let's delete all previous entries
    return self.connection.dropDatabase();
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });
  
const newRecipe={
  title:'flan',
  cuisine:'international',
  duration: {type: Number, min: 0},
}

Recipe.create(newRecipe)
.then(recipe=>{console.log("new recipe created")})
.catch(err=>{console.log(err)})

Recipe.insertMany(data)
.then(recipe=>{console.log("recipes saved")})
.catch(err=>{console.log(err)})

Recipe.findOneAndUpdate({title: "Rigatoni alla Genovese"} ,{duration:100})
.then(recipe=>{console.log("item updated")})
.catch(err=>{console.log(err)})

Recipe.deleteOne({title:"Carrot Cake"})
.then(recipe=>{console.log("item deleted")})
.catch(err=>{console.log(err)})


  

 

 