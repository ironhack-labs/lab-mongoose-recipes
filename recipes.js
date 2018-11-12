const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const data = require("./data.js");

mongoose
  .connect(
    "mongodb://localhost/recipeApp",
    { useNewUrlParser: true }
  )
  .then(() => {
    console.log("Connected to Mongo!");
  })
  .catch(err => {
    console.error("Error connecting to mongo", err);
  });

const recipeSchema = new Schema({
  title: { type: String, required: true, unique: true },
  level: {
    type: String,
    enum: ["Easy Peasy", "Amateur Chef", "UltraPro Chef"]
  },
  ingredients: { type: Array },
  cuisine: { type: String, required: true },
  dishType: {
    type: String,
    enum: ["Breakfast", "Dish", "Snack", "Drink", "Dessert", "Other"]
  },
  image: {
    type: String,
    default: "https://images.media-allrecipes.com/images/75131.jpg"
  },
  duration: { type: Number, min: 0 },
  creator: { type: String },
  created: { type: Date, default: Date.now }
});

const Recipe = mongoose.model("Recipe", recipeSchema);

Recipe.collection.drop();

Recipe.insertMany(data, function(error, docs) {
  if (docs) {
    console.log("Insertados correctamente");
    for (let i = 0; i < data.length; i++) {
      console.log(data[i].title);
    }

    Recipe.updateOne({ title: "Rigatoni alla Genovese" }, { duration: 100 })

      .then(console.log("actualizado corractamente campo duration"))

      .catch(console.log("Fallo al actulaizar campo duration"));

    Recipe.deleteOne({ title: "Carrot Cake" })

      .then( () => mongoose.disconnect(), console.log("borrado documento correctamente"))

      .catch( () => mongoose.disconnect(), console.log("problema al borrar documento"));
      
  }
  if (error) {
    console.log(
      "no se han podido insertar los documentos correctamente",
      error
    );
  }
});
