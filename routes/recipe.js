const express = require('express')
const router = express.Router() 

const Recipe = require('../models/Recipe')

router.get('/new',(req,res)=>{
  Recipe.create({
     title:'Ceviche',
     level:'UltraPro Chef',
     ingredients:['pez','limon','lechuga','cebolla','camote'],
     cuisine:'Peruvian',
     dishType:'Dish',
     duration:'10',
     creator:'I/O',
  })
    .then(r=>{
      console.log(r.title)
      res.send(r.title)
    })
    .catch(e=>{
      res.send(e)
    })
})

router.get('/many',(req,res)=>{
  Recipe.insertMany(require('../data'))
    .then(r=>{
      console.log(r.title)
      //res.send(r.title)
    })
    .catch(e=>{
      console.log(e)

      //res.send(e)
    })
})


module.exports = router