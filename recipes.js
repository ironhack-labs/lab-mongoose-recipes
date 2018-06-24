//Iteration 2 - Create a recipe

const Recipe = require("../lab-mongoose-recipes/recipes.model");
require("../lab-mongoose-recipes/db.config");

const recipe = new Recipe({ 
  title: "Bocata Jamón", 
  level: "Easy Peasy", 
  ingredients: ["Bread", "Spanish Ham", "Olive Oil", "Tomato"],
  cousine: "Spanish",
  dishType: "Snack",
  image: "https://cdn.shopify.com/s/files/1/1589/5089/articles/Razones_comer_jamon_2_1024x1024.jpg?v=1527165180",
  duration: 10,
  creator: "Spanish ancestors",
  date: ("01.01.1700"),
});

recipe.save()
    .then(() => {
        console.log(recipe.title);
    })
    .catch(error => {
        console.error(error);
    })

//Iteration 3 - Insert Many recipes
