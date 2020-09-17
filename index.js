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

    //Insert One Recipe
    try {
      const cookies = {
        title: "Cookies",
        level: "Easy Peasy",
        ingredients: [
          "Flour",
          "Eggs",
          "Brown Sugar",
          "Baking Powder",
          "Chunks of Chocolate",
          "Honey",
        ],
        cuisine: "American",
        dishType: "dessert",
        duration: 20,
        creator: "My Mother",
      };
      //Create recipe
      const resultCreate = await Recipe.create(cookies);
      console.log("---------");
      console.log(resultCreate);

      //Insert Many Recipe
      const resultInsertMany = await Recipe.insertMany(data);
      console.log(resultInsertMany);

      //Update one recipe
      const resultUpdateOne = await Recipe.updateOne(
        {
          title: "Rigatoni alla Genovese",
        },
        {
          duration: 100,
        }
      );
      console.log(resultUpdateOne);

      //Remove One recipe
      const resultRemoveOne = await Recipe.deleteOne({ title: "Carrot Cake" });
      console.log(resultRemoveOne);
      console.log("Carrot Cake recipe removed with success");

      //Disconnect from database
      mongoose.disconnect();
      console.log("---------");
    } catch (err) {
      console.error(err);
    }
  })
  .catch((error) => {
    console.error("Error connecting to the database", error);
  });
