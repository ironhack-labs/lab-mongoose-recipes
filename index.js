const mongoose = require("mongoose");
// Import of the model Recipe from './models/Recipe.model.js'
const recipe = require("./models/Recipe.model");
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
    recipe
      .create({
        title: "chiken nuggets",
        level: "Easy Peasy",
        ingredients: ["chiken", "eggs", "breading"],
        cuisine: "junk food",
        dishType: "other",
        image: "",
        duration: 30,
        creator: "Olivier",
        created: "1993-02-28",
      })
      .then((dbSuccess) => {
        console.log(dbSuccess);
        recipe
          .insertMany(data)
          .then((dbSuccess) => {
            console.log(dbSuccess);
            recipe
              .findOneAndUpdate({
                title: "Rigatoni alla Genovese",
              }, {
                duration: 100,
              }, {
                new: true,
              })
              .then((dbSuccess) => {
                console.log(dbSuccess);
                recipe
                  .deleteOne({
                    title: "Carrot Cake",
                  })
                  .then((dbSuccess) => {
                    console.log(dbSuccess);
                    mongoose.connection
                      .close()
                      .then((dbSuccess) => {
                        console.log("closed");
                      })
                      .catch((err) => {
                        console.error(err);
                      });
                  })
                  .catch((err) => console.error(err));
              })
              .catch((err) => console.error(err));
          })
          .catch((err) => console.error(err));
      })
      .catch((err) => console.error(err));
  });