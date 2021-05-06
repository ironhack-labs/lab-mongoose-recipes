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
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany();
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made
    Recipe.create({
      title: "Quiche",
      level: "Easy Peasy",
      ingredients: ["foo", "bar", "baz"],
      cuisine: "french",
      dish: "main_course",
      duration: 30,
      creator: "Stephane",
    });
    console.log("Quiche was added succesfully");
  })
  .then(() => {
    // implementing
    Recipe.insertMany(data);
  })

  .then(() => {
    // implementing
    Recipe.findOneAndUpdate(
      {title:"Rigatoni alla Genovese"},
      {duration:100}, (err)=>{
        if(err){
          console.log(err);
        } else {console.log("Duration has been updated");}
      }   
    );
  })

  .then(() => {
    // implementing
    Recipe.deleteOne({title:"Carrot Cake"});
  })
  
  mongoose.connection.close();
  process.exit()

  .catch((error) => {
    console.error("Error connecting to the database", error);
  });

// Model.insertMany
