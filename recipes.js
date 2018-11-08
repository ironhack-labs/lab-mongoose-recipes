const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const data = require('./data.js');

mongoose.connect('mongodb://localhost/recipeApp')
  .then(() => {
    console.log('Connected to Mongo!');
  }).catch(err => {
    console.error('Error connecting to mongo', err);
  });

  const recipeSchema = new Schema({
    title: {
      type: String,
      required: true,
      unique: true,
    },
    level: ["Easy Peasy","Amateur Chef","UltraPro Chef"],
    ingredients: [String],
    cuisine: {
      type: String,
      required: true,
    },
    dishType: ["Breakfast", "Dish", "Snack", "Drink", "Dessert", "Other"],
    image: {
      type: String,
      default: "https://images.media-allrecipes.com/images/75131.jpg" ,
    },
    duration: {
      type: Number,
      min: 0,
    },
    creator: String,
    created: {
      type: Date,
      default: Date.now,
    },
  })

  const Recipe = mongoose.model("Recipe", recipeSchema);

Recipe.create( { title: "Pâtes à la carbonara", cuisine: "Italian" } )
  // success
  // then() callbacks get called if the operation is successful
  .then(recipeDoc => {
    console.log("Pasta are done 😻", recipeDoc);
  })
  // error
  // catch() callbacks get called if the operation fails
  .catch((err) => {
    console.log("Pasta failed 😿", err);
  });

Recipe.insertMany(data)
.then(data => {

  // console.log(data)
  
Recipe.findOneAndUpdate( {title: { $eq: "Rigatoni alla Genovese" }}, { $set: { duration: 100 } } )
        .then(recipeDoc => {
          console.log(`Recipe.update() -> ${recipeDoc.title} (id:${recipeDoc._id})`)
        })
        .catch(err =>{
          console.log("Recipe.update() FAILURE 🤯", err)
        })

Recipe.findOneAndRemove({title: { $eq: "Carrot Cake" }})
  .then(recipeDoc => {
    console.log(`DELETED ${recipeDoc.title}`)
  })
  .catch(err => {
    console.log("Delete FAILURE 💩", err)
  });

})
.catch((err) => {
  console.log("Insert failed 😿", err);
});
