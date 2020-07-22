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
    useFindAndModify: false
  })
  .then(self => {
    console.log(`Connected to the database: "${self.connection.name}"`);
    // Before adding any documents to the database, let's delete all previous entries
    return self.connection.dropDatabase();
  })
  .then(async () => {
    // Run your code here, after you have insured that the connection was made

    let data1 = await Recipe.create({
      title: "chicken soup",
      level: "Easy Peasy",
      ingredients: "potato",
      cuisine: "italian",
      dishType: "soup",
      image: "https://images.media-allrecipes.com/images/75131.jpg",
      duration: 220,
      creator: "Hanna"
    });
    if (data1) console.log("Success!", data1.title);
    let data2 = await Recipe.insertMany(data);
    if (data2) console.log("Success!");
    let data3 = await Recipe.findOneAndUpdate(
      { title: "Rigatoni alla Genovese" },
      { duration: 100 }
    );
    if (data3) console.log("Success!");
    let data4 = await Recipe.deleteOne({ title: "Carrot Cake" });
    if (data4) console.log("Success!");
    Promise.all([data1, data3, data2, data4])
      .then(res => {
        console.log(res);
        mongoose.connection.close();
      })
      .catch(err => console.error(err));
  })
  .catch(error => {
    console.error("Error connecting to the database", error);
  });
