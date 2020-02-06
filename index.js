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
    console.log(
      `Connected to Mongo! Database name: "${x.connections[0].name}"`
    );
    Recipe.collection.drop();
  })
  .then(() => {
    const recipe1 = {
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
      image:
        "https://images.media-allrecipes.com/userphotos/720x405/815964.jpg",
      duration: 40,
      creator: "Chef LePapu"
    };
    return Recipe.create(recipe1);
  })
  .then(theNewRecipe =>
    console.log(
      "El método .create() retorna el objeto de la BBDD:",
      theNewRecipe,
      "La receta se llama",
      theNewRecipe.title
    )
  )
  .then(() => Recipe.insertMany(data))
  .then(theNewRecipe =>
    theNewRecipe.forEach(elm => console.log(`-${elm.title}`))
  )

  .then(() =>
    Recipe.findOneAndUpdate(
      {
        title: "Rigatoni alla Genovese"
      },
      {
        duration: 100
      },
      {
        new: true
      }
    )
  )
  .then(theUpdateRecipe => console.log(theUpdateRecipe.duration))
  .then(() =>
    Recipe.deleteOne({
      title: "Carrot Cake"
    })
  )
  .then(deleteInfo => console.log(deleteInfo))
  .then(() => mongoose.connection.close())
  .catch(err => console.error("Error connecting to mongo", err));
