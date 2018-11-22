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

router.get('/update', (req, res) =>{
  Recipe.updateOne({title:'Rigatoni alla Genovese'},{duration:100})
  .then( r => {
      res.send(r)
  }).catch( err => {
      console.log(err)
  })
})

router.get('/delete', (req, res) =>{
  Recipe.deleteOne({title:'Carrot Cake'})
  .then( r => {
      res.send(r)
  }).catch( err => {
      console.log(err)
  })
})

module.exports = router