const express = require('express');
const mongoose = require('mongoose');
const hbs = require('hbs');
const bodyParser = require('body-parser');
const Recipe = require('./models/Recipe');
const data = require('./data.js');
const { saveRecipe , saveAllRecipes , deleteOneByTitle , updateByTitle } = require('./controllers')

const app = express();

hbs.registerPartials(`${__dirname}/views/partials`);
app.set("view engine", "hbs");
app.set(express.static(`${__dirname}/public`));
app.set("views", `${__dirname}/views`);
app.use(bodyParser.urlencoded( { extended : true } ));

mongoose.connect('mongodb://localhost/recipeApp', { useNewUrlParser: true })
  .then(() => {
    console.log('Connected to Mongo!');
  }).catch(err => {
    console.error('Error connecting to mongo', err);
  });


app.get("/" , (request, response) => {
  response.render("index");
});

app.post("/", (request, response) => {
  body = request.body;
  saveRecipe(body);
  response.redirect("/receitas");
});

app.get("/receitas", (request, response) => {
  Recipe.find({ })
  .then(recipes => {
    console.log(recipes);
    response.render("receitas", {recipes});
  });
});

app.get("receitas/:id", (request, response) => {

});


app.listen(3000, () => {
  console.log("Listening FO recipes")
});




// const closeConnection = () => {
//   mongoose.connection.close(() => {
//     console.log('Mongoose default connection disconnected through app termination');
//   })
// };


// setTimeout(closeConnection, 5000)


