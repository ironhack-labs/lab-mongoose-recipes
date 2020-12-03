const mongoose = require("mongoose");

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require("./models/Recipe.model");
// Import of the data from './data.json'
const data = require("./data");

const MONGODB_URI = "mongodb://localhost:27017/recipe-app";

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((self) => {
    console.log(`Connected to the database: "${self.connection.name}"`);
    // Before adding any documents to the database, let's delete all previous entries
    return self.connection.dropDatabase();
  })
  .then(async () => {
    const resdb = await Recipe.create(data[0]);
    console.log(resdb.title);
    const resMany = await Recipe.insertMany(data);
    for (let i = 0; i < data.length; i++) {
      console.log(resMany[i].title);
    }
    const resUpdate = await Recipe.updateOne(
      { title: "Rigatoni alla Genovese" },
      { duration: 100 }
    );
    console.log("Recipe updated !");
    const resRemove = await Recipe.deleteOne({ title: "Carrot Cake" });
    console.log("Recipe has been removed");
  })
  .then(async () => {
    mongoose.disconnect();
  })
  .catch((error) => {
    console.error("Error connecting to the database", error);
  });
