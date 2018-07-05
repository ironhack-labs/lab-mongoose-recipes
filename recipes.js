const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const data = require('./data.js')


mongoose.connect('mongodb://localhost/recipeApp')
  .then(() => {
    const recipeSchema = new Schema({
      title: { type: String, required: true, unique: true },
      level: { type: String, enum: ["Easy Peasy", "Amateur Chef", "UltraPro Chef"] },
      ingredients: { type: Array },
      cousine: { type: String, required: true },
      dishType: { type: String, enum: ["Breakfast", "Dish", "Snack", "Drink", "Dessert", "Other"] },
      image: { type: String, default: "https://images.media-allrecipes.com/images/75131.jpg" },
      duration: { type: Number, min: 0 },
      creator: { type: String },
      created: { type: Date, default: Date.now }
    });
    const RecipeModel = mongoose.model("Recipe", recipeSchema)

    RecipeModel.create({
      title: "Tortilla",
      level: "Easy Peasy",
      ingredients: ["huevo", "sal", "pimienta"],
      cousine: "mediterranea",
      dishType: "Dish",
      duration: 15,
      creator: "Pepe"
    }, (err, recipe) => {
      if (err) { console.log("ha ocurrido un error (insertar Tortilla)") }
      else { console.log(recipe.title) }
    })

    RecipeModel.insertMany(data)
      .then((recipes) => {
        for (i = 0; i < recipes.length; i++) {
          console.log(recipes[i].title)
        }

        RecipeModel.updateOne({ title: "Rigatoni alla Genovese" }, { duration: 100 })
          .then(() => {
            console.log("Recipe updated!");

            RecipeModel.deleteOne({ title: "Carrot Cake" })
              .then(() => {
                console.log("Recipe deleted!");

                mongoose.connection.close();
              })
          });
      })
      .catch((err) => {
        console.log(err);
      });

    console.log('Connected to Mongo!')
  }).catch(err => {
    console.error('Error connecting to mongo', err)
  });


