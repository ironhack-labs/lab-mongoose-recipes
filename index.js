const mongoose = require("mongoose");
const Recipe = require("./models/Recipe.model"); // Import of the model Recipe from './models/Recipe.model.js'
const data = require("./data.js"); // Import of the data from './data.js'

// Connection to the database "recipeApp"
mongoose
  .connect("mongodb://localhost/recipe-app-dev", {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(x => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`);
    Recipe.create({
      title: "Asian Glazed Chicken Thighs",
      level: "Amateur Chef",
      ingredients: [
        "1/2 cup rice vinegar",
        "5 tablespoons honey",
        "1/3 cup soy sauce (such as Silver Swan®)",
        "1/4 cup Asian (toasted) sesame oil",
        "3 tablespoons Asian chili garlic sauce",
        "3 tablespoons minced garlic",
        "salt to taste",
        "8 skinless, boneless chicken thighs"
      ],
      cuisine: "Asian",
      dishType: "Dish",
      image: "https://images.media-allrecipes.com/userphotos/720x405/815964.jpg",
      duration: 40,
      creator: "Chef LePapu"
    })
      .then(res => {
        console.log("You've just inserted this recipe:", res.title);
        Recipe.insertMany(data)
          .then(res => {
            console.log(`Well done, ${res.length} recipes have been added`);
            Recipe.findOneAndUpdate(
              {
                title: "Rigatoni alla Genovese"
              },
              {
                duration: 100
              }
            )
              .then(res => {
                console.log("Great, you've just updated a recipe:", res.title);
                Recipe.deleteOne({
                  title: "Carrot Cake"
                })
                  .then(res => {
                    console.log("A recipe has been deleted:");
                    mongoose.connection.close();
                  })
                  .catch(err => {
                    console.log("Error", err);
                  });
              })
              .catch(err => {
                console.log("Error", err);
              });
          })
          .catch(err => {
            console.log("Error", err);
          });
      })
      .catch(err => {
        console.log("Error", err);
      });
  })
  .catch(err => console.error("Error connecting to mongo", err));
