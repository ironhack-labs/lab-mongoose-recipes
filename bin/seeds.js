const mongoose = require("mongoose");
const Recipe = require("./../models/Recipe.model");
const dataRecipe = require ("./../data.json");

require("./../config/db.config");

const recipe = {
  title: "Pollo al horno",
  level: "Easy Peasy",
  ingredients: [
    "4 muslos de pollo completos",
    "2 patatas medianas",
    "3 zanahorias",
    "1 cebolla",
    "4 dientes de ajo",
    "1 pimiento verde",
    "1/2 pimiento rojo",
    "Tomillo seco",
    "sal y pimienta",
    "Aceite",
  ],
  cuisine:
    "Ponemos en la base de una fuente para horno, las patatas cortadas en láminas de 1cm de grosor, la zanahoria en trozos de un par de cm, la cebolla en tiras, los dientes de ajo picados y el pimiento verde y el rojo cortado también en tiras. Aunque puedes añadir la verdura toca picada, si lo prefieres. Salpimentar",
  dishType: "breakfast",
  image: "https://images.media-allrecipes.com/images/75131.jpg",
  duration: 30,
  creator: "me",
  created: "",
};

Recipe.collection
  .drop()
  .then(() => {
    return Recipe.create(recipe);
  })
  .then((recipeFromDB) => {
    return Recipe.create(dataRecipe);
  })
  .then((recipes) => {
    console.log(recipes)
  })
  .catch((err) => console.log(err));
