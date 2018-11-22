const express = require('express')
const router = express.Router()
const Recipe = require('../models/Recipe')
const data = require('../data.js')
const mongoose = require('mongoose')

router.get('/new' , (req,res) => {
    Recipe.insertMany(data)
    .then( r => {
        res.send(r)
        mongoose.connection.close()
        .then(console.log('Mongoose connection disconnected'))
    })
    .catch( e => {
        res.send(e)
    })
})

router.get('/update', (req,res) => {
    Recipe.updateOne({title: {$in:["Rigatoni alla Genovese"]}},{$set: {"duration":100}})
    .then(r => {
        res.send('Se actualizó con éxito')
        mongoose.connection.close()
        .then(console.log('Mongoose connection disconnected'))
    })
    .catch(e => {
        res.send('No sabes codear :(')
    })
})

router.get('/remove', (req,res) => {
    Recipe.remove({title: {$in:["Carrot Cake"]}})
    .then(r => {
        res.send('Se eliminó con éxito')
        mongoose.connection.close()
        .then(console.log('Mongoose connection disconnected'))
    })
    .catch(e => {
        res.send('No sabes codear, de nuevo :(')
    })
})
module.exports = router