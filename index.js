const mongoose = require('mongoose');
const Recipe = require('./models/Recipe'); // Import of the model Recipe from './models/Recipe'
const data = require('./data.js');  // Import of the data from './data.js'

// Connection to the database "recipeApp"

mongoose.connect('mongodb://localhost/recipeApp', { useNewUrlParser: true })
  .then(() => {
    console.log('Connected to Mongo!');
  }).catch(err => {
    console.error('WAAAAAAAAAT', err);
  });


Recipe.create({
  title: "Pasta con tomate",
  level: "Easy Peasy",
  ingredients: ["Pasta", "Tomate"],
  cuisine: "Mediterranea",
  dishType: "Dish",
  image: "whatever",
  duration: 120,
  creator: "Alessio"
})
  .then(recipe => {
    console.log("Title :", recipe.title)

    Recipe.insertMany(data)
      .then(() =>

        Recipe.find({}, 'title', (err, recipes) => {
          recipes.forEach((recipes) => {
            console.log("recipes-->", recipes.title)
          })
        })
          .then(() =>
            Recipe.updateOne({ title: "Rigatoni alla Genovese" }, { duration: 100 })
              .then(() => {
                console.log("You made it! It's corrected you updated the duration!")
                Recipe.deleteOne({ title: "Carrot Cake" })
                  .then(() => {
                    console.log("You made it! It's DELETEDDD")
                    mongoose.connection.close()
                  })

                  .catch(() => console.log("errrror in deleting"))

              })

              .catch(() => console.log("errrror updating the duration!"))
          )
          .catch(err => { console.log("An error printing the titles of all!", err) })
      )


      .catch(err => { console.log("An error while inserting the array!", err) })
  })
  .catch(err => { console.log("An error in the Pasta recipe!", err) })





// Recipe.findOne({ title: "Carrot Cake" })
//   .then(() => console.log("Carrot cake!"))
//   .catch(() => console.log("errrror NO CARROT CAKE FOUNd"))








// title: { type: String, required: true, unique: true },
// level: { type: String, enum: ["Easy Peasy", "Amateur Chef", "UltraPro Chef"] },
// ingredients: { type: Array },
// cuisine: { type: String, required: true },
// dishType: { type: String, enum: ["Breakfast", "Dish", "Snack", "Drink", "Dessert", "Other"] },
// image: { type: String, default: "https://images.media-allrecipes.com/images/75131.jpg" },
// duration: { type: Number, min: 0 },
// creator: { type: String },
// created: { type: Date, default: Date.now }



// Recipe.create(
//   { type: "Pasta con tomate" },
//   { type: "Easy Peasy" },
//   { type: ["Pasta", "Tomate"] },
//   { type: "Mediterranea" },
//   { type: "Dish" },
//   { type: "whatever" },
//   { type: 120 },
//   { type: "Alessio" },
//   { type: Date }

// )

