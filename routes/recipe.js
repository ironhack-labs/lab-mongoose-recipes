const express = require('express')
const router = express.Router()
const Recipe = require('../models/Recipe')

router.get('/new', (req, res) =>{
    Recipe.create({
        title: 'Huevito con catsun',
        level: 'UltraPro Chef',
        ingredients: ['Huevito', 'Catsun'],
        cuisine: 'Mexican Catsun',
        dishType: 'Breakfast',
        duration: 10,
        creator: 'Yo merenglass',
    }).then( r => {
        console.log(r.title)
        res.send(r.title)
        // res.redirect('/recipes')
    }).catch( err => {
        console.log(err)
    })
})

router.get('/many', (req, res) =>{
    Recipe.insertMany(require('../data'))
    .then( r => {
        for(var dish of r){
            console.log(dish.title)
        }
    }).catch( err => {
        console.log(err)
    })
})

router.get('/update', (req, res) =>{
    Recipe.updateOne({title:"Rigatoni alla Genovese"},{duration:100})
    .then( r => {
        res.send(r)
    }).catch( err => {
        console.log(err)
    })
})

router.get('/delete', (req, res) =>{
    Recipe.deleteOne({title:"Carrot Cake"})
    .then( r => {
        res.send(r)
    }).catch( err => {
        console.log(err)
    })
})

module.exports = router