const express = require('express')
const router = express.Router()
const Recipe = require('../Models/recipe')

router.get('/new', (req, res)=>{
  Recipe.create({title: 'huevo con catsup',
  level:'UltraPro Chef',
  ingredients: ['huevo', 'catsup'],
  cuisine: 'mexsa',
  dishType: 'Breakfast',
  duration: 10,
  creator: 'yo merengues',

}).then(r=>{
  console.log(r.title)
  res.send(r.title)
})
})
module.exports = router