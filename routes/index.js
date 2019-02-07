let router = require("express").Router();
let Recipe = require("../models/Recipe");
// let express = require("express");
//let app = express();

router.get("/", (req, res) => {
  Recipe.find()
    .then(recipe => {
      console.log(recipe);
      res.json(recipe);
    })
    .catch(e => res.send(e));
});
router.get("/new", (req, res) => {
  Recipe.create({
    title: "Pasta con Pesto",
    cuisine: "deLaGranItalia"
  })
    .then(recipe => {
      res.send(`Title: ${recipe.title}`);
    })
    .catch(e => res.send(e));
});

Recipe.findOneAndUpdate(
  { title: "Rigatoni alla Genovese" },
  { duration: "100" }
)
  .then(messae => {
    console.log("rigatolli");
  })
  .catch(e => {
    console.log("we need a fix");
  });
//   router.get("/",(req,res)=>{
//   Recipe.remove({ title : 'Carrot Cake' }, function (err) {
//     // if no error, your models are removed
//     .then(recipe =>{
//       console.log("yea")
//     })
//     .catch(e=>res.send(e))
// })
// })
Recipe.deleteOne({ title: "Carrot Cake" }, function(err) {});

// Recipe.findOneAndDelete({ title: "dhola" })
//   .then(recipe => {
//     console.log(recipe);
//     // res.json(recipe);
//   })
//   .catch(e => res.send(e));

// Recipes.findByIdAndRemove("5c5b7e9765928342c718dace")
//   .then(theRecipeObject => {
//     console.log(theRecipeObject);
//     console.log("Success");
//   })
//   .catch(err => {
//     console.log(err);
//   });

//

// router.post("/update", (req, res, next) => {
//   Recipe.findById("5c5b7e9765928342c718dacf", __id, { duration: 100 });
// });
// router.post("/update", (req, res, next) => {
//   Recipe.findByIdAndUpdate(`id:5c5b7e9765928342c718dacf`){
//     Recipe.update({
//         duration: 100,

//     })
//     .then(message=>{
//       res.send(`the pasta is half the time now`)
//       // console.log("done")
//     })

//     .catch(e=> req.send(e))
//   };
// })
module.exports = router;
