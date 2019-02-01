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

const recipeSchema = new Schema({
  title: { type: String, required: true },
  level: {
    type: String,
    enum: ["Easy Peasy", "Amateur Chef", "UltraPro Chef"]
  },
  ingredients: [],
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
  created: { type: Date, default: Date("2019-02-01") }
});

// the variable "Dog" is our Mongoose model class
// the "Dog" model will allow us to make queries on the "dogs" collection
// (Mongoose turns the model's name string "Dog" to the collection name "dogs")
const Recipe = mongoose.model("Recipe", recipeSchema);

Recipe.create({
  title: "Lasagnas",
  level: "Amateur Chef",
  ingredients: ["Pastas", "Tomatos", "Cheese"],
  cuisine: "Italian",
  dishType: "Dish",
  image:
    "https://www.regal.fr/sites/art-de-vivre/files/styles/recipe/public/lasagnes-bolognaise_istock.jpg?itok=efjvRA8I&c=ba746b8bb7fed86984183a2650c48c73",
  duration: 180,
  creator: "Alexandre",
  created: Date("1990-04-21")
})
  //then() callbacks get called if the operation succeeded
  .then(recipeDoc => {
    console.log("Recipe CREATE success", recipeDoc);
  })
  // catch() callbacks get called if the operation FAILS
  .catch(err => {
    console.log("Recipe CREATE failure !", err);
  });

Recipe.insertMany(data)
  .then(recipeDoc => {
    recipeDoc.forEach(oneRecipe => {
      console.log(`Recipe's title : ${oneRecipe.title}.`);
    });
  })
  .catch(err => {
    console.log("Recipes INSERTMANY failure !", err);
  });

Recipe.findByIdAndUpdate("5c54543114eece1ac7b80d57", {
  $set: { duration: 100 }
}) // $set is like the = operator in JavaScript (dogName = "Milo")
  .then(recipeDoc => {
    console.log(`Recipe UPDATED ${recipeDoc.duration}`);
  })
  .catch(err => {
    console.log("Recipe UPDATE failure", err);
  });

Recipe.findByIdAndRemove("5c54543114eece1ac7b80d56")
  .then(recipeDoc => {
    if (recipeDoc) {
      console.log(`DELETED ${recipeDoc.title} (id: ${recipeDoc._id})`);
    } else {
      console.log("Couldn't find anything to DELETE.");
    }
  })
  .catch(err => {
    console.log("Recipe.findByIdAndRemove() FAILURE", err);
  });

process.on("SIGINT", () => {
  mongoose.connection.close(() => {
    console.log("Mongoose connection closed through app termination");
    process.exit(0);
  });
});
