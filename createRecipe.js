const Recipe= require("./models/Recipe")

console.log("hola")

Recipe.create(  {
    title: "Tortilla",
    level:  "Easy Peasy",
    ingredients: ["eggs", "potato","onions"],
    cuisine: "Spanish",
    dishType: "Dish",
    duration: 30,
    creator: "Jorge",
  })
  .then(recipe => { console.log('The recipe is saved and its value is: ', recipe) })
  .catch(err => { console.log('An error happened:', err)
});