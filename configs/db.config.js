const mongoose = require('mongoose');
const MONGODB_URI = 'mongodb://localhost:27017/mongooseRecipes'

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false })
  .then(() => console.log(`Successfully connected to the database: ${MONGODB_URI}`))
  .catch(() => console.error(`An error ocurred trying to connect to the database: ${MONGODB_URI}`))

  //traido del ejemplo