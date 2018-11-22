const express = require('express')
const router = express.Router()
const Recipe = require('../modelo/Recipe')
const data = require('../data')
router.get('/',(req,res)=>{
      Recipe.create({title: 'Tacos de guisado',
    level: 'Amateur Chef',
    ingredients: ['tortilla', 'guisado'],
    cuisine: 'Mexican',
    dishType: ['Snack'],
    image: 'https://images.media-allrecipes.com/userphotos/720x405/815964.jpg',
    duration: 10,
    creator: 'Chef Rene'})
    .then(recipe=>{
      console.log('La receta ha sido creada, este es el titulo:', recipe.title)
      res.render('index')
})
.catch(err=>{console.log('Error en la creacion de la receta')})

})
router.get('/varios',(req,res)=>{
  
  Recipe.insertMany(data,(error,recipe)=>{
    if(error){
      console.log('Error al agregar los datos')
    }else{
      console.log('Exito al agregar los datos',recipe.title)
    }
  })
})
router.get('/modificar',(req,res)=>{
  Recipe.updateOne({title:'Rigatoni alla Genovese'},{duration:100})
  .then(recipe=>{
    console.log("Receta modificada")
  })
  .catch(error=>{
    console.log(error)
  })
})
router.get('/borrar',(req,res)=>{
  Recipe.deleteOne({title:'Carrot Cake'})
  .then(recipe=>{
    console.log("Platillo borrado")
  })
  .catch(error=>{
    console.log(error)
  })
})



module.exports = router





  
