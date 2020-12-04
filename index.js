const mongoose = require("mongoose");

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require("./models/Recipe.model");
// Import of the data from './data.json'
const data = require("./data");

const MONGODB_URI = "mongodb://localhost:27017/recipe-app";

const newRecipe = {
  title: "Pasta",
  level: "UltraPro Chef",
  ingredients: ["pasta", "sauce"],
  cuisine: "french",
  dishType: "main_course",
  image: "https://images.media-allrecipes.com/images/75131.jpg",
  duration: 10,
  creator: "jacquie",
};

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
  .then(async () => {
    //async function needed in order to use await
    //iteration 2 --- C
    try {
      //try to execute this is
      const dataResult = await Recipe.create(newRecipe); //wait for this to happen before executing next try
      console.log("recipe is this way", dataResult.title);
    } catch {
      //if it doesn't work, throw this error
      (err) => console.log(err);
    }
    //iteration 3 --- R
    try {
      const insert = await Recipe.insertMany(data); //insertMany inserts an array of documents (that has been imported from data.json using const name 'data') into mongoDB
      insert.forEach(function (recipe) {
        //for each recipe , we want the recipe title
        console.log(recipe.title);
      });
    } catch {
      (err) => console.log(err);
    }

    //iteration 4 --- U
    await Recipe.findOneAndUpdate(
      { title: "Rigatoni alla Genovese" }, // find what you want to update (why not with _id? because the _id is different on each computer, as we are using our local database on our own computer)
      { duration: 100 } //update the key:value pair desired
    );
    console.log("yaaa");

    //iteration 5 --- D
    await Recipe.deleteOne({ title: "Carrot Cake" }); // delete

    mongoose.connection.close(); //close the program - done inside the .then so that if the program fails to close, there will be the catch error below
  })

  .catch((error) => {
    console.error("Error connecting to the database", error);
  });
