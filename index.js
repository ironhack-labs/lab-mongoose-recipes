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
  .then(() => {
    // Recipe.create({
    //   title: "Popcorn",
    //   level: "Easy Peasy",
    //   ingredients: ["corn", "oil", "heat"],
    //   cuisine: "worldly",
    //   dishType: "snack",
    //   duration: 5,
    //   creator: "Juju"
    // })
    // .then((result) => {console.log(result.title)})
    // .catch((err) => {console.log(err)})

    Recipe.insertMany(data)
      .then((result) => {
        console.log(result);

        Recipe.findOneAndUpdate(
          { title: "Rigatoni alla Genovese" },
          { $set: { duration: 100 } }
        )
          .then((result) => {
            console.log(result);

            Recipe.deleteOne({ title: "Carrot Cake" })
              .then((result) => {
                console.log(result);
              })
              .then((result) => {
                mongoose.connection.close();
              })

              .catch((err) => {
                console.log(err);
              });
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  })

  .catch((error) => {
    console.error("Error connecting to the database", error);
  });
