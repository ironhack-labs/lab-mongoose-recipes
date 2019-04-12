const mongoose = require("mongoose");
const Recipe = require("./models/Recipe"); // Import of the model Recipe from './models/Recipe'
const data = require("./data.js"); // Import of the data from './data.js'

// Connection to the database "recipeApp"
mongoose
  .connect("mongodb://localhost/recipeApp", { useNewUrlParser: true })
  .then(() => {
    console.log("Connected to Mongo!");
  })
  .catch(err => {
    console.error("Error connecting to mongo", err);
  });

Recipe.create({
  title: "Cake",
  level: "Easy Peasy",
  ingredients: "strawberry",
  cuisine: "Turkish",
  dishType: "Dessert",
  image: "image",
  duration: 40,
  creator: "Yagmur",
  created: "07.07.2019"
});
// newRecipe
//   .save()
//   .then(recipe => {})
//   .catch(error => {});  //this one is creating a recipe too as the

//CREATING MANY DATAS
Recipe.insertMany(data) //cont data is my array so you call data and do a promise
  .then(recipes => {
    console.log(recipe.title);
  })
  .catch(error => {
    console.error(error);
  });

//EDITING
Recipe.findOneAndUpdate(
  { title: "Rigatoni alla Genovese" },
  { $set: { duration: 100 } }
)
  .then(console.log("Success!"))
  .catch(er => {
    console.log("error!");
  });

//example for editing:
// Cat.findOneAndUpdate({age: 17}, {$set:{name:"Naomi"}},function(err, doc){
//   if(err){
//       console.log("Something wrong when updating data!");
//   }
//   console.log(doc);
// });

//Removing
// Character.deleteOne({ name: 'Eddard Stark' }, function (err) {});

Recipe.deleteOne({ title: "Carrot Cake" })
  .then(console.log("Done!"))
  .catch(err => {
    console.log("error");
  });

///close the database
mongoose.connection.close();
