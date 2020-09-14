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
    // Run your code here, after you have insured that the connection was made
    let newRecipe = {
      title: "PB sandwich",
      level: "Easy Peasy",
      ingredients: ["Bread", "Peanut butter", "Jelly"],
      cuisine: "American",
      dishType: "snack",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSea5apZ9YU5p6aPbeBpildk_A0V3memYAwDA&usqp=CAU",
      duration: 5,
      creator: "Josh Darnit - YT Dad guy",
    };

    await Recipe.create(newRecipe);
    console.log(`Recipe: ${newRecipe.title}`);

    await Recipe.insertMany(data);
    data.map((el, i) => console.log(`Recipe ${i}: ${el.title}`));

    await Recipe.updateOne(
      { title: "Rigatoni alla Genovese" },
      { $set: { duration: 100 } }
    )

      .then(() => {
        console.log("Changed! Great success!");
      })
      .catch((error) => {
        console.error("Error: ", error);
      });

    await Recipe.deleteOne({ title: "Carrot Cake" }, function (err) {})
      .then(() => {
        console.log("Deleted! Great success!");
      })
      .catch((error) => {
        console.error("Error: ", error);
      });
  })
  .then(() => {
    mongoose.connection.close();
  })
  .catch((error) => {
    console.error("Error connecting to the database", error);
  });
