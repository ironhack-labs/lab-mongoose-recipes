const mongoose = require("mongoose");
const Recipe = require("./models/Recipe.model"); // Import of the model Recipe from './models/Recipe.model.js'
const data = require("./data.js"); // Import of the data from './data.js'
const datatoInsert = {
  title: "cookies with chocolate",
  level: "Easy Peasy",
  ingredients: ["150g de chocolat", "200gr de farine ", "100 gr de sucre "],
  cuisine: "american",
  dishType: "Dessert",
  duration: 15,
  creator: "Tayssir"
};
// Connection to the database "recipeApp"
mongoose
  .connect("mongodb://localhost/recipe-app-dev", {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(x =>{
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
    return Recipe.create(datatoInsert);
  })
  .then(recipe =>{
    console.log(recipe.title); 
    return Recipe.insertMany(data);
  })
  .then(recipes =>{
    recipes.foreach(recep=>console.log(recep.title));
    return Recipe.findOneAndUpdate({title:"Rigatoni alla Genovese"},{duration:100});
})
.then(updatedRecipe=>{
  console.log("",updatedRecipe);
  return Recipe.findOneAndDelete({title:"Carrot Cake"})
})
.then((deletereceipe)=>{
  console.log("the recipe has been well deleted",deletereceipe);
  return mongoose.connection.close();
})
  .then(()=>{
    console.log("database closed");
}).catch(err => {console.error("Error connecting to mongo", err)
});
/*ITERATION 2 
const datatoInsert = {
  title: "cookies with chocolate",
  level: "Easy Peasy",
  ingredients: ["150g de chocolat", "200gr de farine ", "100 gr de sucre "],
  cuisine: "american",
  dishType: "Dessert",
  duration: 15,
  creator: "Tayssir"
};
Recipe.create(datatoInsert)
  .then(recipe =>{
    console.log("The receipe is saved and its value is: ", recipe)
    console.log(recipe.title);
  }
   
  )
  .catch(error =>
    console.log("An error happened while saving a new recipe:", error)
  );
*/
/*ITERATION 3
const returnValue = Recipe.insertMany(data)
  .then(result => {
    //console.log(`Successfully inserted ${result.itemsCollection} items!`);
    for (let i = 0; i < result.length; i++) {
      console.log(`Successfully inserted ${result[i].title} items!`);
    }

    return result;
  })
  .catch(err => console.error(`Failed to insert receipe: ${err}`));
  */

/* iteration 4
Recipe.updateOne({ title: "Rigatoni alla Genovese" }, { duration: 100 })
  .then(recipe => {
    console.log("it has been successfully updated");
  })
  .catch(error =>
    console.log("An error happened while updating the new recipe:", error)
  );
  */
/*iteration 5
Recipe.findByIdAndDelete({ id: "5e31a6d6cf690136ec8c12ef" })
  .then(recipe => {
    console.log("it has been successfully removed");
  })
  .catch(error =>
    console.log("An error happened while deleting a receipe:", error)
  );
  */


 




