const express = require('express')
const router = express.Router()

const Recipe = require('../models/Recipe')

router.get('/new', (req,res)=>{
    Recipe.create({
        title:"Huevo con catsup",
        level:'UltraPro Chef',
        ingredients: ['huevo', 'catsup'],
        cuisine:'Mexican',
        dishType:'Breakfast',
        duration: 10,
        creator: 'Montse',
    })
    .then(r=>{
        console.log(r.title)
        res.send(r.title)
        // res.redirect('/')
    })
})


module.exports = router