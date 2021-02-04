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
  .then((self) => {
    return Recipe.create({
      title: "Risotto",
      level: "Amateur Chef",
      ingredients: [
        "1 cup of Rice",
        "2 and a half cup of water",
        "curcum",
        "salt",
      ],
      cuisine: "main_course",
      dishType: "main_course",
      image:
        "https://ohmydish.com/wp-content/uploads/2015/03/Risotto-Milanese.jpg",
      duration: 30,
      creator: "Unknown",
    }).then((titleBack) => {
      return console.log(titleBack.title);
    });
  })

  .then((created) => {
    return Recipe.insertMany(data).then((inserted) =>
      inserted.forEach((inserted) => console.log(inserted.title))
    );
  })

  .then((inserted) => {
    return Recipe.findOneAndUpdate(
      { title: "Rigatoni alla Genovese" },
      { $set: { duration: 100 } }
    );
  })

  .then((updated) => {
    console.log("Success");

    return Recipe.deleteOne({ title: "Carrot Cake" });
  })

  .then(() => {
    console.log("Delete success");
    const pr = mongoose.connection.close();
    return pr;
  })

  .catch((error) => console.log(error));
