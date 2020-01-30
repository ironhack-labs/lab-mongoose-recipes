const mongoose = require("mongoose");
const Recipe = require("./models/Recipe.model"); // Import of the model Recipe from './models/Recipe.model.js'
const data = require("./data.js"); // Import of the data from './data.js'

// Connection to the database "recipeApp"
mongoose
  .connect("mongodb://localhost/recipe-app-dev", {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(x =>
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  )
  .catch(err => console.error("Error connecting to mongo", err))

  .then(async x => {
    const chilaquiles = await Recipe.create({
      title: "chilaquiles",
      level: "Amateur Chef",
      ingredients: [
        "tortillas",
        "oil",
        "salsa verde",
        "cream",
        "avocado",
        "chicken"
      ],
      cuisine: "Mexican",
      dishType: "Dish",
      image:
        "https://www.thespruceeats.com/thmb/y-AbnuETR787j6tay8JrZvEiV4s=/2696x2696/smart/filters:no_upscale()/basic-chilaquiles-recipe-2342627-hero-01-f0305b8eb0f7465f9a6de5fa7ae474e6.jpg",
      duration: 20
    });

    console.log(chilaquiles.title);

     const arrayRecipe = await Recipe.create(data)
    arrayRecipe.forEach(recipe => console.log(recipe.title))

    const updateRecipe = await Recipe.updateOne(
      { title: "Rigatoni alla Genovese" },
      { duration: 100 },
      { new: true }
    )
      .then(recipe => console.log("yaaay"))
      .catch(err => console.log(err));

    const deleteRecipe = await Recipe.deleteOne(
      { title: "Carrot Cake" },
      function(err) {
        if (err) console.log(err);
        console.log("deleted");
      }
    );

    const closeDB = await mongoose.connection.close();
  });
