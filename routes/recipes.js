let router = require('express').Router()
let Recipe = require('../models/Recipe')
let mongoose = require('mongoose')


router.get("/", (req, res) => {
  Recipe.find()
  .then(recipes=>res.json(recipes))
  .catch(e=>res.send(e))
})





Recipe.create({
  title: "Sushi",
  ingredients: ["rice", "salmon", "wasabi"],
  cousine: "Japanese",
 }).then((recipe) => {
  console.log(recipe);
 }).catch(console.error)
 
 Recipe.insertMany(data).then((result) => {
  console.log(result.title);
 }).catch(console.error)
 
 Recipe.updateOne({ title: "Rigatoni alla Genovese" }, { duration: 100 })
  .then((result) => { result }).catch(console.error)
 
 Recipe.remove({ title: "Carrot Cake" })
  .then((result) => { result }).catch(console.error)
 // .then(() => {
 //   mongoose.connection.close();
 // })
 
 
 process.on('SIGINT', () => {
  mongoose.connection.close().then(() => {
    console.log('Closed db connection')
    process.exit(0)
  })
 })


 
 .then(recipe=>{
   res.send(`Tu receta ${recipe.title} se creo con exito`)
 })
 .catch(e=>{
    res.send("No se pudo amiko")
 })
 




//export
module.exports = router