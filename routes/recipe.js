const express = require('express')
const router = express.Router() 

const Recipe = require('../models/Recipe')

router.get('/new',(req,res)=>{
  Recipe.create({
     title:'Ceviche',
     level:'UltraPro Chef',
     ingredients:['pez','limon','lechuga','cebolla','camote'],
     cuisine:'Peruvian',
     dishType:'Other',
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
      for(var dish of r)
      console.log(dish.title)
      //res.send(r.title)
    })
    .catch(e=>{
      console.log(e)

      //res.send(e)
    })
})

router.get('/update',(req,res)=>{
  Recipe.updateOne({title:'Rigatoni alla Genovese'},{duration: 100})
    .then(r=>{
      res.send(r)
    })
    .catch(e=>{
      console.log(e)
    })
})

router.get('/delete',(req,res)=>{
  Recipe.deleteOne({title:'Carrot Cake'})
    .then(r=>{
      res.send(r)
    })
    .catch(e=>{
      console.log(e)
    })
})



module.exports = router