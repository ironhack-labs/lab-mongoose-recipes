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
  //res.send(r.title)
}) .catch(err =>{
  console.log(err)
})
})

router.get('/many', (rer, res)=>{
  Recipe.insertMany(require('../data'))
  .then(r=>{
   for(var dish of r){
    console.log(dish.title)
   } 
   // res.send(r.title)
  }).catch(err =>{
    console.log(err)
})
})
router.get('/update', (req, res)=>{
  Recipe.updateOne({title:'Rigatoni alla Genovese'}, {duration:100})
.then(r=>{
  res.send(r)
  //res.send(r.title)
})
.catch(err =>{
  console.log(err)
})
})
router.get('/delete', (req, res)=>{
  Recipe.deleteOne({title:'Carrot Cake'})
.then(r=>{
  res.send(r)
  //res.send(r.title)
})
.catch(err =>{
  console.log(err)
})
})

module.exports = router