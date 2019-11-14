const express = require('express')
const mongoose = require('mongoose');
const Recipe = require('./models/Recipe'); // Import of the model Recipe from './models/Recipe'
const hbs = require('hbs')

const app = express();
app.use(express.static(`${__dirname}/public`));
app.set("views", `${__dirname}/views`);
app.set("view engine", "hbs");
// Connection to the database "recipeApp"
mongoose.connect('mongodb://localhost/recipeApp', { useNewUrlParser: true })
  .then(() => {
    console.log('Connected to Mongo!');
  }).catch(err => {
    console.error('Error connecting to mongo', err);
  });

  const mainRoutes = require("./routes");
  app.use("/", mainRoutes);

  process.on('SIGINT', function() {
    mongoose.connection.close(function () {
      console.log('Disconnect Mongoose');
      process.exit(0);
    });
  });
app.listen(3000, () => console.log("http://localhost:3000"));


