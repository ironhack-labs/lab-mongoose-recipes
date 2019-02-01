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

//_------------------------------ CREATE

const recipeSchema = new Schema({
  title: { type: String, required: true },
  level: {
    type: String,
    enum: ["Easy Peasy", "Amateur Chef", "UltraPro Chef"]
  },
  ingredients: { type: [] },
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
  created: [Date]
  // default: Date.now
});

const Recipe = mongoose.model("Recipe", recipeSchema);

//++++++++++++++++++++++ CREATE RECIPE++++++++++++++++++++++++
Recipe.create({
  title: "Persian Pizza ",
  level: "Amateur Chef",
  ingredients: ["tomato", "cheese", "pepperoni", "saffron"],
  cuisine: "yes",
  dishType: ["Dish"],
  image:
    "https://www.atelierdeschefs.com/media/recette-e30299-pizza-pepperoni-tomate-mozza.jpg",
  duration: 30,
  creator: ["ChefKevin"],
  created: [2018 - 10 - 10]
})
  .then(recipeDoc => {
    console.log("New recipe CREATE success! ", recipeDoc);
    console.log(`PIZZA ${recipeDoc.title}🍕`);
  })
  .catch(err => {
    console.log("Pizza CREATE failure! 😔 ", err);
  });

//================== insert many
Recipe.insertMany(data)
  .then(recipeDoc => {
    recipeDoc.forEach(oneRecipe => {
      console.log(`title recipe => ${oneRecipe.title}`);
    });

    // console.log("recipe MANY success! ", recipeDoc);
  })

  .catch(err => {
    console.log("Pizza CREATE failure! 😔 ", err);
  });

//================== Update recipe

Recipe.findByIdAndUpdate("5c545a9afd22578690673021", {
  $set: { duration: 100 }
})

  .then(Recipe => {
    console.log("Rigatoni alla Genovese's duration is : 💥 ", Recipe.duration);
  })
  .catch(err => {
    console.log(" UPDATE FAILURE ! 🙈", err);
  });

//========== REMOVE
Recipe.findByIdAndRemove("5c545c264a912786bcd229a3")
  .then(recipeDoc => {
    if (recipeDoc) {
      console.log(`DELETED ${recipeDoc.title} (id: ${recipeDoc._id}😎)`);
    } else {
      console.log("couldn't find anything to delete 👍!");
    }
  })

  .catch(err => {
    console.log("Carot cake findByIdRemove FAILURE ! 🥶", err);
  });

//=========== close the data

// Promise;
// mongoose.connection("mongodb://localhost/recipeApp").close();
