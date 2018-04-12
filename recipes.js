const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const data = require('./data.js')

mongoose.connect('mongodb://localhost/recipeApp')
  .then(() => {
    console.log('Connected to Mongo!')
  }).catch(err => {
    console.error('Error connecting to mongo', err)
  });


const recipeSchema = new Schema({
  title: {type: String, required: true, unique: true},
  level: {type: String, enum: ["Easy Peasy", "Amateur Chef", "UltraPro Chef" ]}, 
  ingredients: {type: Array}, 
  cousine: {type: String, required: true},
  dishType: {type: String, enum: ["Breakfast", "Dish", "Snack", "Drink", "Dessert" , "Other"]}, 
  image: {type: String, default: "https://images.media-allrecipes.com/images/75131.jpg"}, 
  duration: {type: Number, min: 0},
  creator: {type: String},
  created: {type: Date, default: new Date()}
});

const recipe = mongoose.model("recipe", recipeSchema);


// const example = new recipe({
//   title: "indian food",
//   level: "Amateur Chef",
//   ingredients: ["pepper", "salt", "chicken"],
//   cousine: "banana",
//   dishType: "Other",
//   image: "https://previews.123rf.com/images/yellowcrest/yellowcrest1511/yellowcrest151100007/60321931-south-indian-banana-variety.jpg",
//   duration: 10,
//   creator: "Leo & Pierre",
// }); 

// example.save()
//   .then(() => {
//     console.log("Banana success!");
//   })
//   .catch((err) => {
//     console.log("ERROR", err);
//   });

// console.log(recipe.title)


// ----------------  INSERTING MANY
recipe.insertMany(data, function (error, docs){});


// ----------------  UPTDATING
const updata = recipe.updateOne({ title: "Rigatoni alla Genovese"}, { duration: 100 })
  .then(() => {
    console.log("UPDATED SUCCESSFULY");
  })
  .catch((err) => {
    console.log("ERROR", err);
  });



// ----------------  DELETING
const del = recipe.deleteOne({ title: "Carrot Cake"})
  .then(() => {
    console.log("REMOVED SUCCESSFULY");
  })
  .catch((err) => {
    console.log("ERROR", err);
  });



// ----------------  CLOSING
Promise.all([updata, del]).then(results => {
  mongoose.connection.close(() => {
    console.log("CLOSED")
  });
})
