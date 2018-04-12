const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const data = require("./data.js");

const plate = new Schema({
  title: { type: String, required: true, unique: true },
  level: {
    type: String,
    enum: ["Easy Peasy", "Amateur Chef", "UltraPro Chef"]
  },
  ingredients: { type: Array, required: true },
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

const Plate = mongoose.model("Plate", plate);


mongoose
  .connect("mongodb://localhost/recipeApp")
  .then(() => {
    console.log("Connected to Mongo!");
    Plate.insertMany(data, function(error, docs) {});
  })
  .catch(err => {
    console.error("Error connecting to mongo", err);
  });

let myPlate = Plate.create(
  {
    title: "Pisto",
    level: "Easy Peasy",
    ingredients: ["Tomate", "Pimiento", "Cebolla"],
    cousine: "Spanish",
    dishType: "Dish",
    duration: 60,
    creator: "MasterChef Risto"
  },
  () => {
    Plate.findOne({ title: "Pisto" }).exec((err, obj) => {
      if (err) {
        console.log(err);
      } else {
        console.log(obj.title);
        Plate.updateOne({ title: "Rigatoni alla Genovese" }, 
        { duration: 100 },
        err =>{
        if (err){
         console.log(err); 
        }
        else {
          console.log("Cooking tine adjusted");
          Plate.deleteOne({ title: "Carrot Cake"}, err =>{ 
            if (err) {
              console.log(err);
            }
            else{
              console.log("Plate deleted")
               mongoose.connection.close()
            }
          });
        }
      }
        )}
    });
  }
);

// Plate.updateOne({ title: "Rigatoni alla Genovese" }, { duration: 100 })
//   .then(success)
//   .catch(errFatal);

// Plate.deleteMany({ title: "Carrot Cake" })
//   .then(success)
//   .catch(errFatal);
// Plate.updateOne ({ title: "Rigatoni alla Genovese"}, {duration: 100})
// .then (success)
// .catch (errFatal);

// Plate.deleteMany ({ title: "Carrot Cake"})
// .then (success)
// .catch(errFatal);

//mongoose.connection.close()
