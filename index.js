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
  .then((self) => {
    console.log(`Connected to the database: "${self.connection.name}"`);
    // Before adding any documents to the database, let's delete all previous entries
    //return self.connection.dropDatabase();
  })
  .then(() => {
    //ITERATION 2
    // Run your code here, after you have insured that the connection was made
    const recipe1 = {
      title: "Onion Soup",
      level: "Easy Peasy",
      ingredients: ["onions", "stock", "salt"],
      cuisine: "Scottish",
      dishType: "soup",
      creator: "Emma",
      duration: 45,
    };
    const pr = Recipe.create(recipe1);
    return pr;
  })
  .then((recipe) => {
    //ITERATION 3
    console.log(recipe.title);
    const pr = Recipe.insertMany(data);
    return pr;
  })
  .then((recipes) => {
    recipes.forEach((recipe) => {
      console.log(recipe.title);
    });
    //ITERATION 4
    const pr = Recipe.findOneAndUpdate(
      { title: "Rigatoni alla Genovese" },
      { $set: { duration: 100 } }
    );
    return pr
  })
  .then(() => {
    console.log("Duration updated!!!")

    //ITERATION 5
    const pr = Recipe.deleteOne(
      { title: "Carrot Cake" }
    );
    return pr

  })
  
    .then(() => {
      console.log("Recipe Deleted!!!")
    
    
      mongoose.connection.close(()=>{
        console.log('Mongoose connection desconnected due to the app termination')
    })

    }
      
      )
 

  //ITERATION 6




  .catch((error) => {
    console.error("Error connecting to the database", error);
  });