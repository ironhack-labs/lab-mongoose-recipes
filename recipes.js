
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const data = require('./data.js');
const recipesShema = new Schema({

  title: { type: String, required: true, unique: true },
  level: { type: String, enum: ["Easy Peasy", "Amateur Chef", "UltraPro Chef"] },
  ingredients: { type: Array },
  cuisine: { type: String, required: true },
  dishType: { type: String, enum: ["Breakfast", "Dish", "Snack", "Drink", "Dessert", "Other"] },
  image: { type: String, default: "http://images.media-allrecipes.com/images/75131.jpg" },
  duration: { type: Number, min: 0 },
  creator: { type: String },
  created: { type: Date, default: Date.now }
})

let recipes1 = {

  title: "Rice",
  level: "Amateur Chef",
  ingredients: ["Rice", "Water", "salt"],
  cuisine: "Colombian",
  dishType: "Dish",

  duration: 40,
  creator: "Chef Lepapu",

}

let promise1 = mongoose.model("Recipe", recipesShema);



let promise2 = Recipe.create(recipes1)
  .then(recipe => { console.log("Recipe is saved", recipe.title) })
  .catch(err => { console.log("An error happened", err) });


let promise3 = Recipe.insertMany(data)
  .then(recipe => { console.log("Recipe is saved", recipe.title) })
  .catch(err => { console.log("An error happened", err) });

let promise4 = Recipe.updateOne({ title: "Rigatoni alla Genovese" }, { duration: 100 })
  .then(recipe => { console.log("update successfull") })
  .catch(err => { console.log("An error happened", err) });

let promise5 = Recipe.deleteOne({ title: "Carrot Cake" })
  .then(recipe => { console.log("Done !!") })
  .catch(err => { console.log("An error happened", err) });

Promise.all([promise1, promise2, promise3, promise4, promise5])
  .then(values => {
    console.log("Recipe updated");
    mongoose.connection.close();
  })

  .catch(err => { console.log(err) });





mongoose.connect('mongodb://localhost/recipeApp')
  .then(() => {
    console.log('Connected to Mongo!');
  }).catch(err => {
    console.error('Error connecting to mongo', err);
  });
  // // recipes.listen(3000, () => {
  // //   console.log('My first app listening on port 3000!');
  // });
