// // app.get('/', (req, res) => {
// //   res.render('home')
// // })
const express = require('express')
const router = express.Router() // no olvides los parentesis
const Recipe = require('../models/Recipe')

router.get('/', (req, res) => {
  res.render('home')
})

// vamos a utilzar el modelo para guardar en la base de datos
router.get('/new', (req, res) => {
  Recipe.create({
    title: "chiles rellenos",
    level: "easy peasy",
    ingredients: ['chile poblano', 'cebolla', 'carne de cerdo', 'queso'],
    cousine: "",
    dishType: "dish",
    // image default
    duration: 120,
    creator: "Julio",
    // created default
  })
    .then(recipe => {
      res.render('recipe', recipe)
    })
    .catch()
})

router.get('/recipes', (req, res, next) => {
  Recipe.find()
    .then(recipes => {
      res.render('list', { recipes })
    })
    .catch(e => next(e))
})

module.exports = router;