const mongoose = require("mongoose");

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require("./models/Recipe.model");
// Import of the data from './data.json'
const data = require("./data");

const MONGODB_URI = "mongodb://localhost:27017/recipe-app";

// Connection to the database "recipe-app"

(async function () {
  try {
    const self = await mongoose.connect(MONGODB_URI, {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });

    console.log(`Connected to the database: "${self.connection.name}"`);
    // Before adding any documents to the database, let's delete all previous entries
    self.connection.dropDatabase();

    const res = await Recipe.create(data[0]);
    console.log(res.title);

    const res2 = await Recipe.insertMany(data);
    res2.forEach((r) => console.log(">", r.title));

    const res3 = await Recipe.findOneAndUpdate(
      { title: "Rigatoni alla Genovese" },
      { duration: 100 },
      { new: true }
    );

    const res4 = await Recipe.deleteOne({
      title: "Carrot Cake",
    });

    mongoose.connection.close();
  } catch (err) {
    console.error(err);
  }
})();
