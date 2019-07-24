const express = require('express');
const router = express.Router();

router.post('/logout', (req,res)=> {
  req.session.destroy();
  res.redirect("/");
});

module.exports = router;