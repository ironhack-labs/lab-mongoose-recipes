const express = require('express')
const router = express.Router()
const Recipe = require('../models/Recipe')

router.get('/new', (require, response)=>{
    Recipe.create({
        title: 'Huevito',
        level: 'Easy Peasy',
        ingredientes: ['Huevito', 'capsun'],
        cuisine: 'Mexican',
        dishType: 'Breakfast',
        duration: 10,
        crator: 'Migu'
    })
    .then(r=>{
        console.log(r)
        //response.send(r.title)
    })
    .catch(e=>{
        console.log(e)
    })
})

router.get('/many', (request, response)=>{
    Recipe.insertMany(require('../data'))
    .then(r=>{
        console.log(r)
        //response.send(r.title)
    })
    .catch(e=>{
        console.log(e)
    })
})

module.exports = router

