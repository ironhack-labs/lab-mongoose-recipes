
const express = require('express')
const router = express.Router()
const Recipe = require('../models/Recipe.js')
const arrRecipes = require('../data.js')

router.get('/new',(req, res)=>{
  Recipe.create({
    title: 'Mole negro',
    level: 'UltraPro Chef',
    ingredients: ['Pasta de mole', 'Caldito de pollo'],
    cuisine: 'Oaxaqueña',
    dishType: ['Dish'],
    image: 'https://images.media-allrecipes.com/userphotos/720x405/815964.jpg',
    duration: 1000,
    creator: 'Abuelita'
  })
  .then(recipe=>{
    console.log('Title: '+recipe.title)
    res.redirect('/insertMany')
  })
  .catch(e=>{
    res.send(e)
  })
})

router.get('/insertMany', (req, res)=>{
    Recipe.insertMany(arrRecipes)
    .then(recipes=>{
      for(var i=0;i<recipes.length;i++){
        console.log('Title: '+recipes[i].title)
      }
      res.redirect('/updateOne')
    })
    .catch(e=>{
      res.send(e)
    })
})

router.get('/updateOne', (req,res)=>{
  Recipe.updateOne({title: {$eq:'Rigatoni alla Genovese'}}, {duration:100})
  .then(update=>{
      console.log('Updated!')
      //res.send(update)
      res.redirect('/remove')
  })
  .catch(e=>{
    res.send(e)
  })
})

router.get('/remove', (req,res)=>{
  Recipe.deleteOne({title: {$eq:'Carrot Cake'}})
  .then(remove=>{
    console.log('Removed!')
    //res.send(remove)
    //mongoose.connection.close()
    mongoose.disconnect()
  })
  .catch(e=>{
    res.send(e)
  })
})
module.exports = router