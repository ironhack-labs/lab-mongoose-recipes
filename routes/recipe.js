const express = require('express')
const router = express.Router()
const Recipe = require('../models/Recipe')

router.get('/new',(req, res)=>{
    Recipe.create({
        title:'huevito con catsun',
        level:'UltraPro Chef',
        ingredientes:['huevo','catsun'],
        cuisine: 'Mexican catsun',
        dishType:'Breakfast',
        duration:10,
        creator:'yo',
    }).then(r=>{
        console.log(r)
        res.send(r.title)
    })
    .catch(err=>{
        console.log(err)
    })
})

router.get('/many',(req,res)=>{
    Recipe.insertMany(require('../data'))
    .then(r=>{
        console.log(r)
    }).catch(err =>{
        console.log(err)
    })
})
module.exports = router