const express = require("express");
const hbs = require("hbs");
const mongoose = require('mongoose');
const Recipe = require('./models/Recipe'); // Import of the model Recipe from './models/Recipe'
const data = require('./data.js');  // Import of the data from './data.js'

const index = express();
index.use(express.static(`${__dirname}/public`));
index.set("views", `${__dirname}/views`);
index.set("view engine", "hbs");

// Connection to the database "recipeApp"
mongoose.connect('mongodb://localhost/recipeApp', { useNewUrlParser: true })
  .then(() => {
    console.log('Connected to Mongo!');
  }).catch(err => {
    console.error('Error connecting to mongo', err);
  });

  const mainRoutes = require("./routes");
  index.use("/", mainRoutes);
  
  index.listen(3000, () => console.log("http://localhost:3000"));


  


  process.on('SIGINT', function() {
    mongoose.connection.close(function () {
      console.log('Mongoose disconnected on app termination');
      process.exit(0);
    });
  });