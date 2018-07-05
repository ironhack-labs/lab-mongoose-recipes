const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const data = require("./data.js");

const recipeSchema = new Schema({
  title: { type: String, required: true, unique: true },
  level: {
    type: String,
    enum: ["Easy Peasy", "Amateur Chef", "UltraPro Chef"]
  },
  ingredients: { type: [] },
  cousine: { type: String, required: true },
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
  created: { type: Date }
});

const Recipe = mongoose.model("Recipe", recipeSchema);

var rec = data[4];
rec.title = "modified";

mongoose
  .connect("mongodb://localhost/recipeApp")
  .then(() => {
    console.log("Connected to Mongo!");
    Recipe.collection.drop();
    // Recipe.create(rec, function(err, xx) {
    //   if (err) console.log("ERROR");
    //   else console.log(`The is saved and its value is: ${xx.title}`);
    // });

    // mongoose.connection.db.dropDatabase();

    Recipe.insertMany(data).then(() => {
      console.log("Entra")
      Recipe.updateOne({ title: "Rigatoni alla Genovese" }, { duration: 100 })
        .then(() => {
          Recipe.deleteOne({ title: "Carrot Cake" })
            .then(()=>{
              console.log("Documento Borrado!")
              mongoose.disconnect();
            })
            .catch();
        })
        .catch();
    });
  })
  .catch(err => {
    console.error("Error connecting to mongo", err);
  });