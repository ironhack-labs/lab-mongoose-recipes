const mongoose = require('mongoose');

// Connection to the database "recipeApp"
mongoose.connect('mongodb://localhost/recipeApp', { 
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false
})

.then(() => console.info(
  'Successfully connected to the database'
))
.catch(() => console.error(
  'An error ocurred trying to connect to the database'
  ))