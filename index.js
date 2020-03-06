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
  .then(x => console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`))
  .catch(err => console.error("Error connecting to mongo", err));

const recipe = new Recipe({
  title: "Boerenkool Stamppot 2",
  level: "UltraPro Chef",
  ingredients: ["Potatoes", "Boerenkool", "Sausage", "Gravy", "Herbs & Spices"],
  cuisine: "Dutch",
  dishType: "Dish",
  duration: 30,
  creator: "Some crazy dutchie"
});

recipe
  .save()
  .then(recip => {
    console.log(recip.title);
  })
  .catch(e => {
    console.log(e);
  });

Recipe.insertMany(data)
  .then(() => {
    Recipe.find({}, { title: 1, _id: 0 })
      .then(result => result.forEach(e => console.log(e.title)))
      .then(() => {
        Recipe.updateOne({ title: "Rigatoni alla Genovese" }, { duration: 100 }).then(() => {
          console.log("Update Successful");
        });
      })
      .then(() => {
        Recipe.deleteOne({ title: /.*Carrot/ }).then(() => console.log("Delete succeeded"));
      });
  })
  .catch(e => console.log(e));

process.on("SIGINT", () => {
  mongoose.connection.close(() => {
    console.log("Connection closing when shutting down..");
    process.exit(0);
  });
});
