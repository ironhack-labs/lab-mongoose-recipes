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
        //response.redirect('/many')
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
        //response.redirect('/update')

    })
    .catch(e=>{
        console.log(e)
    })
})

router.get('/update', (request, response)=>{
    Recipe.updateOne({title: {$eq:'Rigatoni alla Genovese'}}, {duration:100})
    .then(update=>{
        console.log('Duration has been updated')
        response.send(update)
        //response.redirect('/remove')
    })
    .catch(e=>{
        response.send(e)
    })
})

router.get('/remove', (request, response)=>{
    Recipe.remove({title: {$eq:'Carrot Cake'}})
    .then(remove=>{
        console.log('Carrot Cake has been removed')
        response.send(remove)
        //Cierras la bd
        //reponse.close()
    })
    .catch(e=>{
        response.send(e)
    })
})

module.exports = router

