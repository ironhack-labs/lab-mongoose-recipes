const mongoose = require("mongoose");

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require("./models/Recipe.model");
// Import of the data from './data.json'
const data = require("./data.json");

const MONGODB_URI = "mongodb://localhost:27017/recipe-app";

async function beepboop() {
  try {
    await mongoose.connect(MONGODB_URI, {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });
    await mongoose.connection.db.dropDatabase();
    await Recipe.create({
      title: "Mauldaschen",
      level: "UltraPro Chef",
      ingredients: ["Mauldaschen"],
      cuisine: "Schwaebsch",
      dishType: "main_course",
      image:
        "https://image.essen-und-trinken.de/11832162/t/jN/v9/w960/r1/-/maultaschen-klassisch-3e9b141c00bdf0763e7e647f43bc26fb-et2015010381-jpg--8677-.jpg",
      duration: 30,
      creator: "Manu",
    });
    await Recipe.insertMany(data);
    await data.forEach((element) => {
      console.log(element.title);
    });

    await Recipe.findOneAndUpdate(
      { title: "Rigatoni alla Genovese" },
      { duration: 100 },
      { new: true }
    );
    await Recipe.deleteOne({ title: "Carrot Cake" });
    await mongoose.connection.close();
  } catch (error) {
    console.error("Error connecting to the database", error);
  }
}

beepboop();
