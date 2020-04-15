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
    Recipe.create({
      title: "carrot soup",
      level: "Easy Peasy",
      ingredients: ["carrots", "water", "onions"],
      cuisine: "countryside",
      dishType: "soup",
      image:
        "https://images.unsplash.com/photo-1549716678-0effb16786e5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=690&q=80",
      duration: 20,
      creator: "Howard Jackinson",
    })
      .then((dbResponse) => {
        console.log(dbResponse);
        Recipe.insertMany(data)
          .then((dbResponse) => {
            console.log(dbResponse);
            Recipe.findOneAndUpdate(
              {
                title: "Rigatoni alla Genovese",
              },
              {
                duration: 100,
              },
              {
                new: true,
              }
            ).then((dbResponse) => {
              console.log(dbResponse);
            });
            Recipe.deleteOne(
              {
                title: "Carrot Cake",
              },
              {
                new: true,
              }
            )
              .then((dbResponse) => {
                console.log("NO MORE CARROT CAKES", dbResponse);
                mongoose.connection
                  .close()
                  .then((dbResponse) => {
                    console.log("database closed");
                  })
                  .catch((dbErr) => {
                    console.log(dbErr);
                  });
              })
              .catch((dbErr) => {
                console.log(dbErr);
              })
              .catch((dbErr) => {
                console.log(dbErr);
              });
          })
          .catch((dbError) => {
            console.log(dbError);
          });
      })
      .catch((dbError) => {
        console.log(dbError);
      });
  })

  .catch((error) => {
    console.error("Error connecting to the database", error);
  });
