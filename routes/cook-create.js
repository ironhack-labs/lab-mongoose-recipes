const express = require('express');
const router = express.Router();
const Cook = require('../models/Cook');

router.get('/cook-create', (req, res, next) => {
  res.render('cook-create');
  })
;

router.post('/cook-create', (req, res, next) => {

  let newCook = {
    fullName: req.body.fullName,
    nationality: req.body.nationality
  }

  Cook.create(newCook)  
    .then((cook) => {
        res.redirect(`/cook-list`);
    })
    .catch((error)=> {
      next();
    })
  });

module.exports = router;