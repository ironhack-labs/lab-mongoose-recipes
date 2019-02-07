let router = require('express').Router()
let Recipe  = require('../models/Recipe')
const data = require('../data.js');

// creating routers
router.get('/', (req,res) => {
  Recipe.find()
  .then(recipes => res.render('recipes', {recipes}))
  .catch(e=> res.send(e))
})
router.get('/new', (req,res) => {
  Recipe.create({
    title: "Natillas" ||  "Recipe Test",
    ingredients: ['rice','tomato','oil','torta'],
    cuisine: 'Italian',
    creator: 'Pol',
    duration: 120,
    image: 'https://images.media-allrecipes.com/images/75131.jpg',
    created: Date.now(),
  })
  .then(recipe => {
    res.send(`Tu receta ${recipe.title} se ha creado correctamente`)
  })
  .catch(e=> {
    res.send(e)
  })
})

router.get('/import', (req,res) => {
    Recipe.insertMany(data)
    .then(recipe => {
        res.send(`Tu receta ${recipe.title} se ha creado correctamente`)
        console.log(`${recipe.title}`)
    })
    .catch(e=> {
      res.send(e)
    })
  })

  router.get('/update', (req,res) => {
    Recipe.updateOne({title: 'Rigatoni alla Genovese'},{duration: 120})
    .then(recipe => {
      console.log(recipe)
        res.send(`Tu receta se ha actualizado correctamente`)
        console.log(`Tu receta se ha actualizado correctamente`)
    })
    .catch(e=> {
      res.send(e)
    })
  })

  router.get('/delete', (req,res) => {
    Recipe.deleteOne({title: 'Carrot Cake'})
    .then(recipe => {
        res.send(`Tu receta se ha borrado correctamente`)
        console.log(`Tu receta se ha borrado correctamente`)
    })
    .catch(e=> {
      res.send(e)
    })
  })

module.exports = router