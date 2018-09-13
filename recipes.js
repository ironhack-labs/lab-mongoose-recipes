const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const data = require("./data.js");

const recipesSchema = new Schema({
  title: { type: String, required: true, unique: true },
  level: {
    type: String,
    enum: ["Easy Peasy", "Amateur Chef", "UltraPro Chef"]
  },
  ingredients: { type: Array },
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
  creator: { type: String },
  created: { type: Date, default: Date.now }
});

const Recipe = mongoose.model("Recipe", recipesSchema);

mongoose
  .connect("mongodb://localhost/recipeApp")
  .then(() => {
    console.log("Connected to Mongo!");
    Recipe.collection.drop();
    Recipe.insertMany(data)
    .then(() => {
      data.forEach((recipe)=> {
        console.log(' --> title: ', recipe.title);  
      })
      Recipe.updateOne({ title: 'Rigatoni alla Genovese' }, { duration: 100 })
      .then(() =>{
        console.log("Rigatoni Duration Updated!!")
      })
      Recipe.deleteOne({ title: 'Carrot Cake' })
      .then (() => {
        console.log("Carrot Cake Deleted!");
        mongoose.disconnect();
      })
      .catch(e => console.log)
    })
    .catch(e => {
      console.log(e);
    });
  })
  .catch(err => {
    console.error("Error connecting to mongo", err);
  });

          
          
          
          
          