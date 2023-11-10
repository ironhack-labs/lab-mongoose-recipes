const mongoose = require("mongoose");

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require("./models/Recipe.model");
// Import of the data from './data.json'
const data = require("./data");

const MONGODB_URI = "mongodb://127.0.0.1:27017/recipe-app";

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then((x) => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany();
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made
    // updateData();
    updateData()
      .then(() => {
        setTimeout(() => {
          mongoose.connection.close();
          console.log("closing");
        }, 3000);
      })
      .catch((err) => console.log(err));
  })
  .catch((error) => {
    console.error("Error connecting to the database", error);
  });

async function updateData() {
  try {
    const newRecipe = {
      title: "Asian Glazed Chicken Thighs New ONe",
      level: "Amateur Chef",
      ingridients: [],
      cuisine: "Asian",
      dishType: "main_course",
      image:
        "https://images.media-allrecipes.com/userphotos/720x405/815964.jpg",
      duration: 40,
      creator: "Chef LePapu",
    };
    const addNewReciepe = await Recipe.create(newRecipe);
    console.log("data added", addNewReciepe);
    const consolelog = await Recipe.find(
      { title: "Asian Glazed Chicken Thighs New ONe" },
      { title: 1, _id: 0 }
    );
    console.log("writetitle", consolelog);
    const insertData = await Recipe.insertMany(data);
    console.log("data imported", insertData);

    const updateandFind = await Recipe.findOneAndUpdate(
      { title: "Rigatoni alla Genovese" },
      { duration: 38 },
      { new: true }
    );
    console.log("updated", updateandFind);
    const deletedata = await Recipe.deleteOne({ title: "Carrot Cake" });
    console.log("data deleted", deletedata);
  } catch (err) {
    console.log(err);
  }
}
