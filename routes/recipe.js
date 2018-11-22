const express = require ("express")
const router = express.Router()
const Recipe = require("../models/Recipe")

router.get("/new", (req,res)=>{
    Recipe.create({
        title:"Pollito",
        level:"UltraPro Chef",
        ingredients:["pollito","salsita"],
        cuisine:"Mexicana",
        dishType:"Breakfast",
        duration:5,
        creator:"pos yo quien mas"

    }).then(r=>{
        console.log(r.title)
        res.send(r.title)
    }).catch(err =>{
        console.log(err)
    })
})


router.get("/many", (req,res)=>{
    Recipe.insertMany(require("../data"))
    .then(r=>{
        for (var dish of r){
            console.log(dish.title)
        }
    
})
.catch(err =>{
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
module.exports= router