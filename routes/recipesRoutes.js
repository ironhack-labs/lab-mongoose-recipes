const express = require("express")
const router = express.Router() 
const Recipe = require("../models/Recipe")
const data = require('../data.js')

router.get("/",(req,res)=>{
  res.render("home")
})

router.get("/new-recipe",(req,res)=>{
  Recipe.create({data})
  .then(recipe =>{
    res.render("lista",recipe)
  })
})

//un archivo diferente debe exportar lo que contiene!
module.exports = router