const mongoose = require('mongoose');
//const Schema   = mongoose.Schema;
const data = require('./data.js');
const express = require("express");
const bodyParser = require('body-parser');
const app = express();
app.set("view engine", "hbs");
app.set("views",__dirname+"/views");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:false}));

const Receta = require("./models/recipes");


mongoose.connect('mongodb://localhost:27017/recipeApp')
  .then(() => {
    console.log('Connected to Mongo!')
  }).catch(err => {
    console.error('Error connecting to mongo', err)
  });

app.get("/",(req,res,next)=>{
  /*const newRecipe = new Receta({title:"Tacos", cousine:"C"});
  //console.log(newRecipe)
  newRecipe.save()
  .then(r => {
    console.log(r)
    res.send("Agregada Receta");
  })
  .catch(e=>console.log(e));*/
  console.log(data);
  console.log(recipeApp);


});


 app.listen(3000, e=>console.log("listo"));
