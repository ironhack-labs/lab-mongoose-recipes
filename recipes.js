//Iteration 2 - Create a recipe

const Recipe = require("../lab-mongoose-recipes/recipes.model");
require("../lab-mongoose-recipes/db.config");
const data = require("../lab-mongoose-recipes/data")

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
Recipe.insertMany(data)
    .then((recipes) => {
        for (let recipe of recipes){
            console.log(recipe.title);
        }
    })
    .catch(error => {
        console.error(error);
    })
//Iteration 4 - Update recipe

Recipe.findOneAndUpdate({ title: 'Rigatoni alla Genovese' }, { $set: { duration: 100 } }, { new: true })
    .then((recipe) => {
        console.log(`${recipe.title} updated`)
    })
    .catch(error => {
        console.error(error);
    })

 //Iteration 5 - Remove a recipe
Recipe.findOneAndRemove({ title: 'Carrot Cake' })
    .then((recipe) => {
        console.log(`${recipe.title} removed`);
    })
    .catch(error => {
        console.error(error);
    })

// Iteration 6 - Close the Database



