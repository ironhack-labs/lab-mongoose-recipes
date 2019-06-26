const mongoose = require("mongoose");
const Recipe = require("./models/Recipe"); // Import of the model Recipe from './models/Recipe'
const data = require("./data.js"); // Import of the data from './data.js'

// Connection to the database "recipeApp"
mongoose
  .connect("mongodb://localhost/recipeApp", { useNewUrlParser: true })
  .then(() => {
    console.log("Connected to Mongo!");
  })
  .catch(err => {
    console.error("Error connecting to mongo", err);
  });

Recipe.deleteMany({})
  .then(() => {
    Recipe.create({
      title: "Quinoa and Salmon Salad",
      level: "Easy Peasy",
      ingredients: ["Quinoa", "Smoked Salmon", "Spinach", "Beans"],
      cuisine: "International",
      dishType: "Dish",
      image:
        "https://destemperados.clicrbs.com.br/arquivos/ckeditor/DSB86SgztBhGqvtj7Sp/5877b126659634.76507005.jpg",
      duration: 10,
      creator: "Chef Mariana"
    })
      .then(recipe => console.log("Recipe of " + recipe.title + " was successfully created."))
      .catch(err => {
        console.log("An error occured", err);
      });

    Recipe.insertMany(data)
      .then(recipes => {
        for (let i = 0; i< data.length; i++) {
          console.log("Recipe of " + recipes[i].title + " was successfully inserted.");
         }

        Recipe.updateOne(
          { title: "Rigatoni alla Genovese" },
          { duration: 100 }
        ).then(res => {console.log(`Correctly updated ${res.nModified} recipe(s)!`)});

        Recipe.deleteOne({ title: "Carrot Cake"})
        .then(res => {console.log("Carrot Cake recipe correctly deleted")}); 

      
      })
      .catch(err => {
        console.log("An error occured", err);
      });
  })
  .catch(err => {
    console.log("An error occured", err);
  });

  setTimeout(() => {
    mongoose.connection.close();
  }, 2000)
