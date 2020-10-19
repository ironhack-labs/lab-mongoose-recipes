const mongoose = require("mongoose");

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require("./models/Recipe.model");
// Import of the data from './data.json'
const data = require("./data");

const MONGODB_URI = "mongodb://localhost:27017/recipe-app";

// Connection to the database "recipe-app"

(async function startApp() {
  try {
    const db = await mongoose.connect(MONGODB_URI, {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`Connected to the database: "${db.connection.name}"`);

    await db.connection.dropDatabase();

    // Iteration 2
    const result = await Recipe.create({
      title: "Pizza Margheritta",
      level: "Amateur Chef",
      ingredients: [
        "Wheat Flour",
        "Water",
        "Salt",
        "Active dry yeast",
        "Sugar",
        "Olive oil",
        "Tomato sauce",
        "Mozzarela",
        "Fresh basil",
      ],
      cuisine: "Italian",
      dishType: "main_course",
      duration: 60,
      creator: "An Italian guy",
    });

    console.log(result.title);

    // Iteration 3
    const resultMany = await Recipe.insertMany(data);
    resultMany.map((result) => console.log(result.title));

    // Iteration 4
    const resultUpdate = await Recipe.updateOne(
      { title: "Rigatoni alla Genovese" },
      { $set: { duration: 100 } }
    );
    const updatedDoc = await Recipe.find({ title: "Rigatoni alla Genovese" });
    console.log(
      `Sucessfully updated document with title ${updatedDoc[0].title} to duration ${updatedDoc[0].duration}`
    );

    // Iteration 5
    const resultDelete = await Recipe.deleteOne({ title: "Carrot Cake" });
    console.log(
      `Operation sucessful: ${Boolean(resultDelete.ok)}, Documents matched: ${
        resultDelete.n
      }, Documents deleted: ${resultDelete.deletedCount}`
    );
    //   console.log(resultDelete);
    //   console.log("Operation successful!");

    // Iteration 6

    // Forma 1
    // await mongoose.disconnect();

    // Forma 2
    // const closeResult = await db.connection.close();
    // console.log("Connection closed => ", closeResult);

    // Forma 3
    const closeResult = await mongoose.connection.close();
    console.log("Connection closed => ", closeResult);
  } catch (err) {
    console.error(err);
  }
})();
