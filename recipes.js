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
  created: { type: Date, default: Date.now }
});

const Recipe = mongoose.model("Recipe", recipeSchema);

Recipe.create({ title: "Tortila de patatas con cebolla", cuisine: "hola" })
  .then(result => {
    console.log("result", result);
    Recipe.insertMany(data).then(result => {
      result.forEach(item => {
        console.log(item.title, item._id);
      });
      Recipe.updateOne(
        { title: "Rigatoni alla Genovese" },
        { duration: 100 }
      ).then(result => {
        console.log("updated", result);
        Recipe.findOneAndDelete({ title: "Carrot Cake" }).then(result => {
          console.log("borrado");
          mongoose.connection.close().then(result => {
            console.log("Mongoose default connection closed");
          });
        });
      });
    });
  })
  .catch(error => {
    console.log("error", error);
  });

// Recipe.insertMany(data)
// .then(result => {
//   return result.forEach( item => {
//     console.log(item.title)
//   })
// })
// .catch(error => {
//   console.log('error', error)
// })
// Recipe.findByIdAndUpdate('5bc07ad4095b07858b3e5ea0', {duration: 100})
// .then(result => {
//   console.log('updated', result.duration)
// })
// .catch(error => {
//   console.log('error', error)
// })

// Recipe.findOneAndRemove({title: 'Carrot Cake'})
// .then(result => {
//     console.log('borrado')
// })
// .catch(error => {
//   console.log('error', error)
// })
