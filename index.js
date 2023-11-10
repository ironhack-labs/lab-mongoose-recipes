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
    updateData();
  })

  // .then(() => {
  //   mongoose.connection.close();
  // })
  .catch((error) => {
    console.error("Error connecting to the database", error);
  });

//close the database connection
//mongoose.connection.close()

async function updateData() {
  try {
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
