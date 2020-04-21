const mongoose = require("mongoose");

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require("./models/Recipe.model");
// Import of the data from './data.json'
const data = require("./data");

const MONGODB_URI = "mongodb://localhost:27017/recipe-app";

//Iteration 2: Recipe
const newRecipe = {
  title: "Cheeseburger",
  level: "Easy Peasy",
  ingredients: ["bun", "cheese", "patty", "lettuce", "mayonnaise", "ketchup"],
  cuisine: "American",
  dishType: "main_course",
  image:
    "https://i2.wp.com/www.foodrepublic.com/wp-content/uploads/2012/03/033_FR11785.jpg?resize=700%2C%20466&ssl=1",
  duration: 20,
  creator: "Karen",
};

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
  .then(() => {
    //Iteration 2: Create recipe
    Recipe.create(newRecipe)
      .then((recipe) =>
        console.log(`A new recipe was created: ${recipe.title}`)
      )

      //Iteration 3 - Insert multiple recipes
      .then(() => {
        Recipe.insertMany(data)
          .then((recipes) =>
            recipes.forEach((recipe) => {
              console.log(`A new recipe was added: ${recipe.title}`);
            })
          )

          //Iteration 4 - Update recipe
          .then(() => {
            Recipe.findOneAndUpdate(
              { title: "Rigatoni alla Genovese" },
              { duration: 100 }
            )
              .then(console.log("Recipe has been updated!"))
              .catch((err) => console.log("Recipe couldn't be updated:", err));
          })

          //Iteration 5 - Remove a recipe
          .then(() => {
            Recipe.deleteOne({ title: "Carrot Cake" })
              .then(console.log("Recipe has been deleted!"))

              //Iteration 6 - Close the Database
              .then(() => {
                mongoose.connection.close(() => {
                  console.log("Database has been closed!!");
                });
              })

              .catch((err) => console.log("Recipe couldn't be deleted:", err));
          })

          .catch((err) =>
            console.log(`An error has occured trying to insert recipes:`, err)
          );
      })
      .catch((err) =>
        console.log(
          `An error has occured trying to create ${recipe.title}:`,
          err
        )
      );
  })
  .catch((error) => {
    console.error("Error connecting to the database", error);
  });
