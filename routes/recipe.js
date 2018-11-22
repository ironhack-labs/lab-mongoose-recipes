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
    })
})

module.exports=router