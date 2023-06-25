/** @format */

const mongoose = require("mongoose");

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require("./models/Recipe.model");
// Import of the data from './data.json'
const data = require("./data");

const MONGODB_URI = "mongodb://localhost:27017/recipe-app";

let newRecipe = {
  title: "Tortilla de Papa",
  level: "Easy Peasy",
  ingredients: ["Potaotes", "Eggs", "Onion", "Oil"],
  cuisine: "Spanish",
  dishType: "main_course",
  image: "https://images.media-allrecipes.com/userphotos/720x405/2280918.jpg",
  duration: 160,
  creator: "Alexandra Vasinova",
};

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then((res) => {
    console.log(`Connected to the database: "${res.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany();
  })

  .then(() => {
    // Run your code here, after you have insured that the connection was made

    return (Recipe.create(newRecipe))
  })



  .then ((result) => {

    console.log(`New recipe added: ${result.title}`)
    
    return Recipe.insertMany(data)
  }

  )

  .then((result) => {

    result.forEach(recipe => {  console.log(`New recipe added: ${recipe.title}.`)
      
    });
   
    return Recipe.findOneAndUpdate(
      { title: "Rigatoni alla Genovese" },
      { duration: 100 },
      {new: true}
    );

  }

  )


  .then((result) => {

     console.log(`Recipe updated successfully: ${result.title}`);
    return Recipe.deleteOne({ title: "Carrot Cake" });

  }
  
  
  )

  .then ((result)=> {

     console.log(`Recipe ${result} deleted.`);

   return mongoose.connection.close()


  })

  .then((result) =>{

   console.log(`Database is disconnected: ${result}.`)

  })


  .catch((error) => {
    console.error("Error connecting to the database", error);
  });
