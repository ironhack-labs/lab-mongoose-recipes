const express = require('express')
const router = express.Router()
const Recipe = require('../models/Recipe')


router.get('/new', (req,res)=>{
  Recipe.create({
    title: 'Paletitas',
    level: 'UltraPro Chef',
    ingredients: ['Huevito', 'Catsun'],
    cuisine: 'Mexican Catsun',
    dishType: 'Breakfast',
    duration: 10,
    creator: 'Yo merengues',
  })
  .then(r=>{
    console.log(r.title)
    res.send(r.title)
    //res.redirect('/recipes')
  }).catch(e=>
    {
      console.log(e)
    })
})

module.exports = router