const mongoose = require('mongoose');
const express= require('express')
const hbs= require('hbs')
const path= require('path')
const app= express()

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
    useFindAndModify: false
  })
  .then(self => {
    //console.log(`Connected to the database: "${self.connection.name}"`);
    // Before adding any documents to the database, let's delete all previous entries
   // return self.connection.dropDatabase();
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });

  //Iteration 2 create a recipe
app.get("/newrecipe", async ()=>{
  let info = {
    "title": "Receta nueva de Vivi",
    "level": "Amateur Chef",
    "ingredients": [
      "1/2 cup rice vinegar",
      "5 tablespoons honey",
      "1/3 cup soy sauce (such as Silver Swan®)",
      "1/4 cup Asian (toasted) sesame oil",
      "3 tablespoons Asian chili garlic sauce",
      "3 tablespoons minced garlic",
      "salt to taste",
      "8 skinless, boneless chicken thighs"
    ],
    "cuisine": "Asian",
    "dishType": "main_course",
    "image": "https://images.media-allrecipes.com/userphotos/720x405/815964.jpg",
    "duration": 40,
    "creator": "Chef LePapu"
  }
let recipeCreated= await Recipe.create(info)
console.log(recipe)
})


//Iteration 3 Insert multiple recipes

app.get("/addrecipes", async ()=>{
let recipesAdded= await Recipe.insertMany(data)
recipesAdded.map((element)=>{
  console.log(element.title)
})
})

//Iteration 4 Update recipe

app.get("/updatedrecipe", async ()=>{
  let updatedRecipe= await Recipe.findOneAndUpdate({title:"Rigatoni alla Genovese"}, {duration: 100})
  console.log("succes", updatedRecipe)
})

//Ireatio 5 Remove recipe y 6 apagar

app.get("/removerecipe", async () => {
  await Recipe.deleteOne({title: "Carrot Cake"})   
  await console.log("removed succesfully")
  
   mongoose.connection.close()
  })


 


//levantar  servidor

app.listen(3000, ()=>{
  console.log("Corriendo")

})
