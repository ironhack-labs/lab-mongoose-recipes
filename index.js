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
    const cheeseBread = {
      title: "Paozito de queijo",
      level: "UltraPro Chef",
      ingredients: ["paozito", "queijito"],
      cuisine: "Brazuca",
      dishType: "snack",
      image:
        "https://vovopalmirinha.com.br/wp-content/uploads/2019/06/pao-de-queijo.jpg",
      duration: 30,
      creator: "Vitor Vieira",
    };

    Recipe.create(cheeseBread)
      .then((result) => {
        console.log(`Recipe created...? ${result}`);
      })
      .catch((error) => {
        console.error("Error", error);
      });

    Recipe.insertMany(data)
      .then((result) => {
        result.forEach((result) => {
          console.log(`title: ${result.title}`);
        });
        Recipe.findOneAndUpdate(
          { title: "Rigatoni alla Genovese" },
          { duration: 100 },
          { new: true }
        )
          .then((result) => {
            console.log(`Duration updated...? ${result.duration}`);
          })
          .catch((error) => {
            console.error("Error", error);
          });

        Recipe.deleteOne({ title: "Carrot Cake" })
          .then((result) => {
            console.log(`Recipe deleted...? ${result}`);

            mongoose.connection.close().then(() => {
              console.log("Server closed...?");
            });
          })
          .catch((error) => {
            console.error("Error", error);
          });
      })
      .catch((error) => {
        console.error("Error", error);
      });
  })

  .catch((error) => {
    console.error("Error connecting to the database", error);
  });
