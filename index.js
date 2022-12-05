const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then(x => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });
  const mongoose = require('mongoose');

  // Import of the model Recipe from './models/Recipe.model.js'
  const Recipe = require('./models/Recipe.model');
  // Import of the data from './data.json'
  const data = require('./data');
  
  const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';
  
  // Connection to the database "recipe-app"
  mongoose
    .connect(MONGODB_URI)
    .then(x => {
      console.log(`Connected to the database: "${x.connection.name}"`);
      // Before adding any recipes to the database, let's remove all existing ones
      return Recipe.deleteMany()
    })
    .then(() => {
      // Run your code here, after you have insured that the connection was made
    })
    .catch(error => {
      console.error('Error connecting to the database', error);
    });
  
  //
  
  /**const newRecipe = mongoose.model("Recipe",{
    title:{
      type: String,
      required: true,
      unique: true,
    },
    level:{
      type: String,
      enum: ["Easy Peasy", "Amateur Chef", "UltraPro Chef"],
    },
    ingredients:[String],
    cuisine:{
      type: String,
      required: true,
    },
    dishType:{
      enum:["breakfast", "main_course", "soup", "snack","drink", "dessert", "other" ]
    },
    image:{
      type: String,
    },
    duration:{
      type:Number,
      min: 0,
    },
    creator:{
      type: String,
    },
    created:{type: Date,
      default: Date.now,
    }
  });*/
  
  //Iteration 2
  /**Recipe.create({
    title: "Chicken Noodle Soup ",
    level: "Amateur Chef",
    indredients:["Butter", "1 Onion", "2 Carrots", "Chicken", "Noodles", "Lemon juice"],
    cuisine: "American",
    dishType: "soup",
    image: "https://images.media-allrecipes.com/images/75131.jpg",
    duration: 60,
    creator: "Mar Molina",
  })
  .then(recipe => console.log("Chicken Noodle Soup", recipe))
  .catch(error => console.log("Chicken Error", error))*/
  
  //Iteration 3
  Recipe.insertMany(data)
  .then(recipe => console.log("Recipe title", data[1].title))
  .catch(error => console.log("Recipe error", error))
  
  
  //Iteration 4
  Recipe.findOneAndUpdate({title:"Rigatoni alla Genovese"}, {duration:100}, {new:true})
  .then(recipe => console.log("Rigatoni alla Genovese updated!", data[4].duration))
  .catch(error => console.log("Update error", error))
  
  //Iteration 5
  Recipe.deleteOne({title:"Carrot Cake"})
  .then(recipe => console.log("Carrot cake deleted!"))
  .catch(error => console.log("Delete error", error))