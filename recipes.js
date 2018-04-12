const mongoose = require("mongoose");
const data = require("./data.js");

mongoose
  .connect("mongodb://localhost/recipeApp")
  .then(() => {
    console.log("Connected to Mongo!");
  })
  .catch(err => {
    console.error("Error connecting to mongo", err);
  });

const Schema = mongoose.Schema;

const recipeSchema = new Schema({
  title: { type: String, required: true, unique: true },
  level: {
    type: String,
    enum: ["Easy Peasy", "Amateur Chef", "UltraPro Chef"]
  },
  ingredients: { type: Array },
  cousine: { type: String, required: true },
  dishType: {
    type: String,
    enum: ["Breakfast", "Dish", "Snack", "Dessert", "Other"]
  },
  image: {
    type: String,
    default: "https://images.media-allrecipes.com/images/75131.jpg"
  },
  duration: { type: Number, min: 0 },
  creator: { type: String },
  created: { type: Date, default: Date.now }
});

const Receta = mongoose.model("Receta", recipeSchema);

Receta.create(
  {
    title: "Lentejas a la riojana",
    level: "Amateur Chef",
    ingredients: ["lentejas", "chorizo", "pimenton"],
    cousine: "Mediterranea",
    dishType: "Dish",
    image:
      "https://unareceta.com/wp-content/uploads/2014/05/receta-de-lentejas-a-la-riojana-640x427.jpg",
    duration: 30,
    creator: "Arguiñano"
  },
  function(err, receta) {
    if (err) {
      console.log("ERROR : " + err);
    } else {
      console.log("Se ha creado la receta " + receta);
      Receta.insertMany(data, function(error, docs) {
        if (error) {
          console.log("ERROR : " + error);
        } else {
          docs.forEach(e => console.log(`Title: ${e.title}`));
          Receta.updateOne(
            { title: "Rigatoni alla Genovese" },
            { duration: 100 }
          )
            .then(() => {
              console.log("Updated");
              Receta.deleteOne({ title: "Carrot Cake" })
                .then(() => {
                  console.log("Succes, Item deleted");
                  mongoose.connection.close();
                })
                .catch(err => console.log(`ERROR: ${err}`));
            })
            .catch(console.log(err => console.log(`Error : ${err}`)));
        }
      });
    }
  }
);
