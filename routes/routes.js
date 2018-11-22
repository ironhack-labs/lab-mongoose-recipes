const express = require("express");
const mongoose = require("mongoose")
const router = express.Router()
const recipeData = require("../data")
const Recipe = require("../recipes")



// router.get("/new", (req,res) => {
//   Recipe.create(
//     {title: "Enchiladas", level:"Easy Peasy", ingredients:["chile", "tortilla","pollo"],cuisine: "Mexican", dishType: "Dish", image:"https://images-gmi-pmc.edge-generalmills.com/8ba62fee-ecf3-4360-8b7f-ae7cbf7c6d74.jpg",
//      duration: 10, creator: "Pepe", created: new Date(2010, 12, 24)
//     })
//     .then(r => {
//     //res.render("recipes", recipe)
//       console.log(r)
//     }).catch(e => {
//       console.log(e)
//     })
      
// })

router.get("/other", (req,res) => {
  Recipe.insertMany(recipeData)
    
  .then(r => {
      res.send('actualizada')
      mongoose.connection.close()
        .then( r =>{
          res.send("cerrado!")
        }).catch(e => {
          console.log("no se cerró!")
        })
    }).catch(e => {
      console.log(e)
    })
      
})

router.get("/update", (req,res) => {
  Recipe.deleteOne({title: {$in: ["Rigatoni alla Genovese"]}},{$set:{duration: 100}})
    
  .then(r => {
      res.send('La actualización fue un éxito!')
      mongoose.connection.close()
        .then( r =>{
          res.send("cerrado!")
        }).catch(e => {
          console.log("no se cerró!")
        })
    }).catch(e => {
      console.log(e)
    })
      
})

router.get("/remove", (req,res) => {
  Recipe.remove({title: {$in: ["Carrot Cake"]}})
    
  .then(r => {
      res.send('La eliminación fue un éxito!')
      mongoose.connection.close()
        .then( r =>{
          res.send("cerrado!")
        }).catch(e => {
          console.log("no se cerró!")
        })
    }).catch(e => {
      console.log(e)
    })
      
})

module.exports = router