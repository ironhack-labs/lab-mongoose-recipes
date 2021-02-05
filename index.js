const mongoose = require('mongoose');
const express = require('express')
const path = require('path')
const app = express()
// const hbs = require("hbs")
// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

app.use(express.static("public")) 
app.set("views", __dirname + "/views") 


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
    // return self.connection.dropDatabase();
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });

  
  app.get("/create",(req,res,next)=> {

    let newRec = {
      title: "Asian Glazed Chicken Thighs",
      level: "Amateur Chef",
      ingredients: [
        "1/2 cup rice vinegar",
        "5 tablespoons honey",
        "1/3 cup soy sauce (such as Silver Swan®)",
        "1/4 cup Asian (toasted) sesame oil",
        "3 tablespoons Asian chili garlic sauce",
        "3 tablespoons minced garlic",
        "salt to taste",
        "8 skinless, boneless chicken thighs"
      ],
      cuisine: "Asian",
      dishType: "main_course",
      image: "https://images.media-allrecipes.com/userphotos/720x405/815964.jpg",
      duration: 40,
      creator: "Chef LePapu"
    }

    Recipe.create(newRec,(error,recipe)=>{
      if(error){
        return console.log(error)
      }
      console.log(`Esto es lo que comeras ${recipe.title}`)
    })
    
  })

  app.get("/manny",(req,res) => {
    Recipe.insertMany(data, { ordered: false }, (error , recetas)=>{
      recetas.map((e)=>{
        console.log(`Atascate ${e.title}`)
      })
    })
  })

  app.get("/updatyy",(req,res)=>{
    Recipe.updateOne({title : "Rigatoni alla Genovese"}, {duration:190},(error , nuevoValor)=>{
      console.log(error)
    })
  })

  app.get("/ciao", () => {
    Recipe.deleteOne({ name: "Carrot Cake" })
    .then( console.log("listo , borrado"))
        
})

  app.listen(3000)