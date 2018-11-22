const express = require('express')
const router = express.Router()
const Recipe = require('../models/recipes')

router.get('/new', (req, res)=>{
  Recipe.create({
    title: 'Huevito con Catsun',
    level: 'UltraPro Chef',
    ingredients:['Huevito', 'Catsun'],
    cuisine: 'Mexican Castin',
    dishType: 'breakfast',
    duration: 10,
    creator: 'yo merenglass',
  }).then(r=>{
    console.log(r.title)
    res.send(r)
    //res.redirect('/recipes')
  })
})

module.exports= router

//module.exports = mongoose.model('Recipe', Recipe)