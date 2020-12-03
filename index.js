const mongoose = require("mongoose");

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require("./models/Recipe.model");
// Import of the data from './data.json'
const data = require("./data");
const { deleteOne } = require("./models/Recipe.model");
const MONGODB_URI = "mongodb://localhost:27017/recipe-app";

const ribs = {
  title: "American ribs",
  level: "Amateur Chef",
  ingredients: ["Pork ribs", "spcies", "barbecue sauce"],
  cuisine: "American",
  dishType: "main_course",
  image: "https://images.media-allrecipes.com/images/75131.jpg",
  duration: 240,
  creator: "Lucas",
  created: 03/12/2020,
};




// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then((self) => {
    console.log(`Connected to the database: "${self.connection.name}"`);
    // Before adding any documents to the database, let's delete all previous entries
    return self.connection.dropDatabase();
  })
  .then(async() => {
    const createNewRecipe = await Recipe.create(ribs);
    console.log(createNewRecipe.title);
  })
  .then(async() =>{
    const importRecipe = await Recipe.insertMany(data);
    importRecipe.forEach(Recipe => {
        //console.log(Recipe.title);
    });
  })
  .then(async() =>{
    const modifyOne = await Recipe.findOneAndUpdate( { title: "Rigatoni alla Genovese"}, {duration: 100}, {new: true});
  })
  .then(async() =>{
    const deleteARecipe = await Recipe.deleteOne({ title:  "Carrot Cake"}, {new: true});
    console.log(deleteARecipe.title, "is deleted")
  })
  .then(() =>{
    mongoose.connection.close(() =>{
      console.log("Connection closed");
      process.exit(0);
    })
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });
