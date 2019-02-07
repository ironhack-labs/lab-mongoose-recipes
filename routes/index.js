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
    title: "Cocos",
    cuisine: "italia"
  })
    .then(recipe => {
      res.send(`Title: ${recipe.title}`);
    })
    .catch(e => res.send(e));
});

module.exports = router;
