const mongoose = require("mongoose");

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require("./models/Recipe.model");
// Import of the data from './data.json'
const data = require("./data");
//console.log(data);
const { model } = require("./models/Recipe.model");

const MONGODB_URI = "mongodb://localhost:27017/recipe-app";

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then((self) => {
    console.log(`Connected to the database: "${self.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany();
  })
  .then(async () => {
    //iteration 2 - Create a recipe OK
     Recipe.create({
      title: "Magret de canard",
      level: "Amateur Chef",
      ingredients: ["duck", " haricots verts"],
      cuisine: "french",
      dishType: "main_course",
      duration: 10,
      creator: "eva",
    });
     //iteration 3 - Insert multiple recipes Ok 
     //(on line6 from index.js heres the "link" on const data = require("./data") is taking all the array data of recipes taken from data.json file)
     Recipe.insertMany(data);

  }); 
   // iteration 4 - Update Rigatoni alla Genovese duration field and set it to 100   
    Recipe.findOneAndUpdate( 
     {title: "Rigatoni alla Genovese", 
       duration: 100}
   );


