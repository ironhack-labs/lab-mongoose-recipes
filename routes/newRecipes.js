const express = require('express')
const router = express.Router()
const Recipe = require('../models/recipes')

router.get('/new', (req, res)=>{
  Recipe.create({
    title: 'Huevito con Catsun',
    level: 'UltraPro Chef',
    ingredients:['Huevito', 'Catsun'],
    cuisine: 'Mexican',
    dishType: 'breakfast',
    duration: 10,
    creator: 'yo merenglass',
  }).then(r=>{
    console.log(r.title)
    res.send(r.title)
    //res.redirect('/recipes')
  }).catch(e=>{
    res.send(e)
  })
})

router.get('/many', (req, res)=>{
  Recipe.insertMany(require('../data'))
  .then(r=>{
    for(var dish of r){
      console.log(dish.title)
    }
  }).catch( err=>{
    console.log(err)
  })
})

router.get('/update', (req, res)=>{
  Recipe.updateOne({title:'Rigatoni alla Genovese'},{duration:100})
  .then(r =>{
    res.send('Rigatoni alla Genovese duration updated')
  }).catch(err =>{
    console.log(err)
  })
})

router.get('/delete', (req, res) =>{
  Recipe.deleteOne({title:'Carrot Cake'})
  .then( r => {
      res.send('Carrot Cake no longer available :(')
  }).catch( err => {
      console.log(err)
  })
})


module.exports= router

//module.exports = mongoose.model('Recipe', Recipe)