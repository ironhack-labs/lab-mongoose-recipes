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
  title: {
    type: String,
    required: true,
    unique: true
  },
  level: {
    type: String,
    enum: ["Easy Peasy", "Amateur Chef", "UltraPro Chef"]
  },
  ingredients: {
    type: [String]
  },
  cuisine: {
    type: String,
    required: true
  },
  dishType: {
    type: String,
    enum: ["Breakfast", "Dish", "Snack", "Drink", "Dessert", "Other"]
  },
  image: {
    type: String,
    default: "https://images.media-allrecipes.com/images/75131.jpg."
  },
  duration: {
    type: Number,
    min: 0
  },
  creator: {
    type: String
  },
  created: {
    type: Date,
    default: Date.now
  }
});

const Recipe = mongoose.model("Recipe", recipeSchema);

let newRecipe =
Recipe.create({
  title: "Nutella Crepe",
  level: "Easy Peasy",
  ingredients: ["eggs", "milk", "flour", "Nutella"],
  cuisine: "French",
  dishType: "Breakfast",
  duration: 20,
  creator: "Anna",
})
.then(recipeDoc =>{
  console.log(`${recipeDoc.title}`);
})
.catch(err =>{
  console.log("recipeCreate Failure", err)
});
newRecipe.save()

let manyRecipe =
Recipe.insertMany(data)
.then(recipeArray =>{
  recipeArray.forEach(oneRecipe => {
    console.log(`${oneRecipe.title}`);
  })
})
.catch(err =>{
  console.log("recipeInsertMany Failure", err)
});

let recipeUpdate =
Recipe.findOneAndUpdate({title: { $eq: "Rigatoni alla Genovese" } },
{ $set: { duration: 100 } })
.then(recipeDoc =>{
  console.log(`${recipeDoc.duration} update is a sucess`);
})
.catch(err =>{
  console.log("recipeUpdate Failure", err)
});

let recipeRemove =
Recipe.findOneAndRemove({ title: { $eq: "Carrot Cake" } } )
.then(recipeDoc =>{
  console.log(`${recipeDoc.title} delete is a sucess`);
})
.catch(err =>{
  console.log("recipeDelete Failure", err)
});

Promise.all([newRecipe, manyRecipe, recipeUpdate, recipeRemove])
.then( all=>{
  mongoose.disconnect()
  console.log("connection disconnect");
})
.catch(all =>{
  mongoose.disconnect()
  console.log("connection disconnect");
});