const express = require('express');
const router  = express.Router();
const Cook = require('../models/Cook');
ObjectId = require('mongodb').ObjectID;


router.get("/", (req, res, next) => {
    Cook.find({})
    .then((cooks)=>{
      res.render('cooks', {cooks});
    })
  })

  router.get("/add", (req, res, next) => {
    res.render('cook-add');
  })
  
  router.post("/add", (req, res, next) => {
    const {name} = req.body;
    const newCook = new Cook({ name });
    newCook.save()
    .then(() => {
      res.redirect('/cooks');
    })
    .catch((error) => {
      res.send(error)
    })
  })

  router.get("/details", (req, res, next) => {
    const cookId = req.query.id;
      Cook.findById(cookId, function (err, adventure) {})
      .then((cook)=> {
        res.render('cook', {cook});  
      })
  })

  router.get("/edit", (req, res, next) => {
    const cookId = req.query.id;
    Cook.findById(cookId, function (err, adventure) {})
    .then((cook)=> {
      res.render('cook-edit', {cook});  
    })
    
  })
  
  router.post("/edit", (req, res, next) => {
    const {cookId, name} = req.body;
    Cook.updateOne({_id: ObjectId(cookId)}, { $set: {name}}, { new: true })
    .then((cook) => {
      res.redirect('/cooks');
    })
    .catch((error) => {
      console.log(error);
    })
  })

  router.get("/delete", (req, res, next) => {
    const cookId = req.query.id;
    Cook.findByIdAndDelete(cookId, function (err, adventure) {})
    .then((cook)=> {
      res.redirect('/cooks');
    })
  })

module.exports = router