const mongoose = require('mongoose');
const express = require('express')
const path = require('path')
const app = express()

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data'); ///este es el doc con la info

app.set("views", path.join(__dirname,"views"))
app.use(express.static(path.join(__dirname, "public")))



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
    /*return self.connection.dropDatabase();*/
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made
  
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });


  
app.get("/recipes",(req,res,next)=> {

    let receta1 = {
      title:"Pollo con mole",
      level:"Amateur Chef",
      ingredients:["pollo","mole","sal","aceite"],
      cuisine:"Mexicana",
      dishType:"breakfast",
      duration:20,
      creator:"Juan Moles",
    }

    Recipe.create(receta1,(error,recipe)=>{
      if(error){
        return console.log(error)
      }
      console.log(`Generamos receta ${recipe}`)
    })
    res.send(`<p>Receta Creada</p>`)
  })

app.get("/addMany",(req,res,next) => {
  Recipe.insertMany(data,(error,recipes)=>{
    if(error){
      return console.log(error)
    }
    console.log(`Insertamos las recetas`)
  })
  res.send(`<p>Receta Creada</p>`)
})

app.get("/fixrecipe",(req,res,next)=>{//preguntar, la que creamos se vuelve parte de data?=
  Recipe.findOneAndUpdate({title:"Rigatoni alla Genovese"}, {duration:100}, (error, recipes) =>{
    if(error) {
      return console.log(error)
    }
    console.log(`Receta actualizada`)
  })
  res.send(`<p>Receta actualizada</p>`)
})

app.get("/delete",(req,res,next)=>{
  Recipe.deleteOne({title:"Carrot Cake"}, (error,recipe) => {
    if(error){
      return console.log(error)
    }
    console.log(`Recetae eliminada`)
  })
  res.send(`<h1>La receta fue eliminada</h1>`)
})

  app.listen(3000)