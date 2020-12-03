const mongoose = require("mongoose");

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require("./models/Recipe.model");
// Import of the data from './data.json'
const data = require("./data");

const MONGODB_URI = "mongodb://localhost:27017/recipe-app";

mongoose.set("useFindAndModify", false);

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
    const cookies = {
      title: "cookie recheado",
      level: "Easy Peasy",
      ingredients: ["açucar mascavo", "açucar", "ovos", "manteiga", "farinha de trigo", "nutella"],
      cuisine: "american",
      dishType: "dessert",
      image:
        "https://img.elo7.com.br/product/zoom/2810065/cookie-recheado-cookie.jpg",
      duration: 40,
      creator: "Some grandma",
    };

    Recipe.insertMany(data)
      .then((data) => {
        data.map((recipe) => console.log(recipe.title));
        Recipe.findOneAndUpdate(
          { title: "Rigatoni alla Genovese" },
          { duration: 100 },
          {
            new: true,
          }
        )
          .then((result) => console.log("Updated!"))
          .catch((error) => console.log(error));

        Recipe.deleteOne({ title: "Carrot Cake" })
          .then((result) => {
            console.log("Removed!");
            mongoose.connection.close();
          })
          .catch((error) => console.log(error));
      })
      .catch((error) => console.log(error));

    Recipe.create(cookies)
      .then((cookies) => console.log(cookies.title))
      .catch((error) => console.log(error));
  })
  .catch((error) => {
    console.error("Error connecting to the database", error);
  });
