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
    useFindAndModify: false,
  })
  .then((self) => {
    console.log(`Connected to the database: "${self.connection.name}"`);
    // Before adding any documents to the database, let's delete all previous entries
    return self.connection.dropDatabase();
  })
  .then(() => {
    return Recipe.insertMany(data);
  })
  .then(() => {
    return Recipe.findOneAndUpdate(
      { title: "Rigatoni alla Genovese" },
      { duration: 100 },
      { new: true }
    );
  })
  .then(() => {
    return Recipe.findOneAndDelete({ title: "Carrot Cake" });
  })
  .then(() => {
    console.log("Success");
  })
  // .then(() => {
  //   return Recipe.create({
  //     title: "Chicken Drama",
  //     level: "Amateur Chef",
  //     ingredients: ["chicken", "tomatoes"],
  //     cuisine: "fantasy",
  //     dishType: "other",
  //     duraion: 60,
  //     creator: "GM",
  //   });
  // Run your code here, after you have insured that the connection was made
  // })
  //Need to disconnect mongoose before catch as errors are executed if everything fails and it could run long time before it disconnects. So my LAST INSTRUCTION is my last THEN and not .catch
  .then(() => {
    return mongoose.disconnect();
  })
  .catch((error) => {
    console.error("Error connecting to the database", error);
  });
