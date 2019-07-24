const express = require('express');
const router = express.Router();
const Cook = require('../../models/Cook');

router.get('/edit/:id', (req, res, next) => {
  let id = req.params.id;
  Cook.findById(id)  
    .then((cook) => {
        res.render('cook/edit', {cook});
    })
    .catch((error)=> {
      next();
    })
});

router.post('/edit/:id', (req, res, next) => {
  let id = req.params.id;

  let updatedCook = {
    fullName: req.body.fullName,
    nationality: req.body.nationality
  }

  Cook.findByIdAndUpdate(id, updatedCook, {new:true})  
    .then((cook) => {
        res.redirect(`/cook/list`);
    })
    .catch((error)=> {
      next();
    })
  });

module.exports = router;