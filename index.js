const mongoose = require("mongoose");

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require("./models/Recipe.model");
// Import of the data from './data.json'
const data = require("./data");

const MONGODB_URI = "mongodb://localhost:27017/recipe-app";

// first step of all. Run your code here, after you have insured that the connection was made (mstart)

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((self) => {
    console.log(`Connected to the database: "${self.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones

    // need to check (both work!)
    return mongoose.connection.dropDatabase();
    // return Recipe.deleteMany();
  })

  .then(() => {
    // Run your code here, after you have insured that the connection was made
    Recipe.create({
      //iteration2
      title: "Paella",
      level: "Amateur Chef",
      ingredients: ["rice", "vegetables", "praws", "peas", "pepper"],
      cuisine: "Spanish",
      dishType: "main_course",
      image:
        "https://www.simplyrecipes.com/thmb/guUt8eMy7mZn6Aw62nVMWSorQ3U=/960x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/__opt__aboutcom__coeus__resources__content_migration__simply_recipes__uploads__2018__07__Seafood-Paella-LEAD-VERTICAL-fc5f1e71baa8484cafa1a106ffaa9c23.jpg",
      duration: 2,
      creator: "Anna Velarde",
    }).then((element) => {
      console.log(element.title);
    });
  });

// //iteration 3
Recipe.insertMany(data)
  .then((elements) => {
    elements.forEach((recipe) => {
      console.log("recipes created", recipe.title);
    });
  })

  //iteration 4: Update recipe

  .then(() =>
    Recipe.findOneAndUpdate(
      { title: "Rigatoni alla Genovese" },
      { duration: 100 }
    )
  )
  .then((updated) => {
    console.log("updatedRecipe:", updatedRecipe);
    return updated;
  })

  //Iteration 5: Remove a recipe

  .then(() => Recipe.deleteOne({ title: "Carrot Cake" }))

  .then((recipe) => console.log("deleted"))

  //Iteration 6 : Close the Database
  //we stop MONGOS

  .then(() => {
    console.log("allRecipes:", allRecipes);

    return mongoose.connection.dropDatabase();
  })

  .catch((err) => {
    // in case i screw up, do this
    console.error("Overall Oopsie", err);
  })

  .finally(() => {
    return mongoose.disconnect();
  });
