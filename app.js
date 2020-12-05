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
  .then(async () => {
    // Run your code here, after you have insured that the connection was made
    //ITERATION 2

    try {
      const recipeCreate = await Recipe.create({
        title: "xxhehehehexxxxxx",
        level: "Easy Peasy",
        ingredients: ["teste1", "teste2", "teste3"],
        cuisine: "oieNAONAOigos",
        dishType: "breakfast",
        image: "dasdas.com",
        duration: 200,
        creator: "denim",
      });
      console.log("title: ", recipeCreate.title);
    } catch (err) {
      console.log("err catch iteration 2", err);
    }

    //ITERATION 2 --FINISH

    //ITERATION 3 --START

    try {
      const insertMany = await Recipe.insertMany(data);
      insertMany.map((elem) => {
        console.log(elem.title);
      });
    } catch (err) {
      console.log("err catch iteration 3", err);
    }

    //ITERATION 3 --FINISH

    //ITERATION 4 --START

    try {
      const filter = { title: "Asian Glazed Chicken Thighs" };
      const update = { duration: 999 };
      const editingRecipe = await Recipe.findOneAndUpdate(filter, update, {
        new: true,
      });
      console.log("edit :", editingRecipe);
    } catch (err) {
      console.log("err iteration 4 catch :", err);
    }
    //ITERATION 4 --FINISH
    //ITERATION 5 --START

    try {
      const deleteRecipe = await Recipe.deleteOne({
        title: "Rigatoni alla Genovese",
      });
      console.log("deleted success", deleteRecipe);
    } catch (err) {
      console.log("err catch iteration 5 :", err);
    }
    //ITERATION 5 --FINISH
    //ITERATION 6 --START
    try {
      const connectionClosed = await mongoose.connection.close();
      console.log("connection closed success");
    } catch (err) {
      console.log(err);
    }
    //ITERATION 6 --FINISH
  })

  .catch((error) => {
    console.error("Error connecting to the database", error);
  });
