const express = require('express');
const router  = express.Router();
const data = require('../lab-mongoose-recipes/data')

router.get('/create', (req, res, next) => {
    const Yummy = new Plate ({
      title : 'Tacos',
      level : 'Amateur Chef',
      ingredients : ['tortilla','carne','cebolla'],
      cuisine : 'mexicana',
      dishType : ['Dish'],
      image : '',
      duration : 120,
      creator : 'Chef Lion',
    })
    Yummy.save()
    .then(()=>{
    res.send('Receta guardada');
    console.log("Recipe Saved");
  })
    .catch(err=>console.log(err))
  })