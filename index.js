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
    Recipe.insertMany(data)
      .then((data) => {
        data.forEach((el) => {
          console.log(el.title);
        });
        Recipe.findOneAndUpdate(
          { title: "Rigatoni alla Genovese" },
          { $set: { duration: 100 } }
        )
          .then((data) => {
            console.log(`${data.duration}`);
          })
          .catch((error) => console.error(error));
        Recipe.deleteOne({ title: "Carrot Cake" })
          .then((data) => {
            console.log(`Delete`);
          })
          .catch((error) => console.error(error));

        mongoose.connection
          .close()
          .then(() => {
            console.log(`Disonnected from the database`);
          })
          .catch((error) => {
            console.error("Error disconnecting from the database");
          });
      })
      .catch((error) => console.error(error));
  })
  .catch((error) => {
    console.error("Error connecting to the database", error);
  });
