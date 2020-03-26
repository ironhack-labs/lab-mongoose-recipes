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
    useUnifiedTopology: true
  })
  .then(self => {
    console.log(`Connected to the database: "${self.connection.name}"`);
    // Before adding any documents to the database, let's delete all previous entries
    return self.connection.dropDatabase();
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made
    const recipe1 = new Recipe({
      title: "Pie",
      level: "Easy Peasy",
      ingredients: ["flour", "egg", "milk", "cocoa powder", "crystal sugar"],
      cuisine: "American",
      dishType: "dessert",
      duration: 40,
      creator: "God"
    });
    Recipe.create(recipe1)
      .then(() => {
        Recipe.insertMany(data)
          .then(() => {
            Recipe.findOneAndUpdate({ title: /gatoni/i }, { duration: 100 })
              .then(() => {
                console.log("Duration changed!");
                Recipe.deleteOne({ title: /arrot/ })
                  .then(() => {
                    console.log("Carrot Cake deleted");
                    Recipe.find()
                      .then(res => {
                        res.forEach(item => {
                          console.log(item.title);
                        });
                        mongoose.connection.close();
                      })
                      .catch(error => console.log(error));
                  })
                  .catch(error => console.log(error));
              })
              .catch(error => console.log(error));
          })
          .catch(error => console.log(error));
      })
      .catch(error => console.log(error));
  })
  .catch(error => {
    console.error("Error connecting to the database", error);
  });
