const express = require('express');
const router = express.Router();
const Cook = require('../../models/Cook');

router.get('/create', (req, res, next) => {
  res.render('cook/create');
});

router.post('/create', (req, res, next) => {

  let newCook = {
    fullName: req.body.fullName,
    nationality: req.body.nationality
  }

  Cook.create(newCook)  
    .then(() => {
        res.redirect(`/cook/list`);
    })
    .catch((err)=> {
      console.log(err);
      res.send("Error");
    })
  });

module.exports = router;