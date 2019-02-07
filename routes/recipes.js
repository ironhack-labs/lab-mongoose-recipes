let router = require ('express').Router()
let recipe = require('../models/Recipe')
//traemos mongoose
// let mongoose = require ('mongoose')
let data = require ('../data')


//crear rutas
router.get("/",(req,res)=>{
    recipe.find()
    .then(recipes=>res.json(recipes))
    .catch(e=>res.send(e))
})

router.get("/new",(req,res)=>{
    recipe.create({
        title: "Enchiladas" || "Dish",
        author: "Amateur Chef" || "Amateur Chefi",
        ingedientes: ['chile', 'jitomate', 'pollo', 'sal'],
        cuisine: "Mexicana" || "Nacional",
        dishType: "Dish"|| "Plato fuerte",
        image: 'https://images.media-allrecipes.com/images/75131.jpg.',
        duration:"40",
        creator: 'Daniela',
        created: Date.now()
    })
    .then(recipe => {
        res.send(`Tu receta ${recipe.title} se creó con éxito`)
    })
    .catch(e => {
        res.send(e)
    })
    })

    router.get("/import",(req,res)=>{
        recipe.insertMany(data)    
        .then(recipe => {
            console.log(data)
            // res.json(recipe)
        })
        .catch (e =>{
            res.send(e)
        })    
    })
    

//exportar
module.exports = router