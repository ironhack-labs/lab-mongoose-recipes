const express = require('express')
const router = express.Router()
const Recipe = require('../models/Recipe')

router.get('/new',(req,res)=>{
  Recipe.create({
    title:'Huevos',
    level:'UltraPro Chef',
    ingredients:['Huevos','Sal'],
    cuisine:'Mexican',
    dishType:'Breakfast',
    duration:10,
    creator:'Yo mero'
  })
      .then(r=>{
        console.log(r.title)
        res.send(r.title)
        // res.redirect('/recipes')
      }).catch(e=>{
        res.send(e)
      })
})

module.exports = router