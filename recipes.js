const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const data = require("./data.js");

mongoose
  .connect("mongodb://localhost/recipeApp")
  .then(() => {
    console.log("Connected to Mongo!");
  })
  .catch(err => {
    console.error("Error connecting to mongo", err);
  });

const recepiceSchema = new Schema({
  title: String,
  level: {
    type: String,
    enum: ["Easy Peasy", "Amateur Chef", "UltraPro Chef"]
  },
  ingredients: Array,
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

  creator: String,
  created: {
    type: Date,
    default: Date.now
  }
});

const Recepice = mongoose.model("Recepice", recepiceSchema);

Recepice.create(data) // or Model.insertMany
  .then(recepice => {
    console.log("The recepice is saved and its value is: ", recepice);
    var myUpadtePrmise = Recepice.updateOne(
      { title: "Rigatoni alla Genovese" },
      { duration: 100 }
    )
      .then(() => {
        console.log("succes update");
      })
      .catch(() => {
        console.log("error update");
      });

    var myDeletePrmise = Recepice.deleteOne({ title: "Carrot Cake" })
      .then(() => {
        console.log("succes delete");
      })
      .catch(() => {
        console.log("error delete");
      });

    return Promise.all([myUpadtePrmise, myDeletePrmise]); // attendre la fin des 2 promesses avant de passer à la suivante
  })
  .then(() => {
    mongoose.connection.close();
    console.log("success close db");
  })
  .catch(err => {
    console.log("An error happened:", err);
  });
