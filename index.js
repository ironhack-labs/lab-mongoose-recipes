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
    // Run your code here, after you have insured that the connection was made

    Recipe.create({
      title: "Banana",
      level: "Easy Peasy",
      ingredients: ["potassio", "casca", "banana"],
      cuisine: "Africa",
      dishType: "breakfast",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/8/8a/Banana-Single.jpg",
      duration: 15,
      creator: "Deus",
      created: 01 - 01 - 0001,
    })

      .then((result) => {
        console.log(result);
      })
      .catch((err) => {
        console.error(err);
      });

    Recipe.insertMany(data)

      .then((result) => {
        result.map((itens) => {
          console.log(itens.title);
        });
        Recipe.findOneAndUpdate(
          { title: "Rigatoni alla Genovese" },
          { duration: 100 },
          {
            new: true,
          }
        )
          .then((result) => {
            console.log(result.duration);
          })
          .catch((err) => {
            console.error(err);
          });
        Recipe.deleteOne({ title: "Carrot Cake" })
          .then((result) => {
            console.log(`Rango deletado ${result}`);
            mongoose.connection.close();
          })
          .catch((err) => {
            console.error(err);
          });
      })

      .catch((err) => {
        console.error(err);
      });
  })
  .catch((error) => {
    console.error("Error connecting to the database", error);
  });
