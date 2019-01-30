const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const data = require("./data.js");

const recipeSchema = new Schema({
  title: { type: String },
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
    default: " https://images.media-allrecipes.com/images/75131.jpg"
  },
  duration: { type: Number, min: 0 },
  creator: { type: String },
  created: { type: Date, default: Date.now }
});

const Recipe = mongoose.model("Recipe", recipeSchema);

var dataArr = [...data];

mongoose
  .connect("mongodb://localhost/recipeApp")
  .then(() => {
    return Recipe.create({
      title: "Cuban Rice",
      level: "Easy Peasy",
      ingredients: ["Rice", "pepper", "bacon", "onion", "vinegar", "tomato"],
      cuisine: "Cuban",
      dishType: "Dish",
      image:
        "https://www.google.com/url?sa=i&source=images&cd=&cad=rja&uact=8&ved=2ahUKEwi_o4Ll-ZXgAhXq2eAKHfW3BtUQjRx6BAgBEAU&url=http%3A%2F%2Frecetasdecocina.elmundo.es%2F2016%2F11%2Farroz-cubana-receta-facil.html&psig=AOvVaw2dlmJc2BJh6pMagf9SvUgl&ust=1548953015422971",
      duration: 110,
      creator: "Pepe Almondigo"
    })
      .then(() => {
        return Recipe.insertMany(dataArr);
        console.log({ title: 1, _id: 0 });
      })
      .then(() => {
        return Recipe.updateOne(
          { title: "Rigatoni alla Genovese" },
          { duration: 100 }
        ).then(console.log);
      })
      .then(() => {
        return Recipe.deleteOne({ title: "Carrot Cake" }).then(
          console.log("Deleted")
        );
      })
      .catch(err => console.log(err));
  })
  .then(() => {
    mongoose.connection.close(() => {
      console.log(
        "Mongoose default connection disconnected through app termination"
      );
      process.exit(0);
    });
  })
  .catch(err => {
    console.error("Error connecting to mongo", err);
  });
