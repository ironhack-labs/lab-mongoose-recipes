const mongoose = require("mongoose");

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require("./models/Recipe.model");
// Import of the data from './data.json'
const data = require("./data");

const MONGODB_URI = "mongodb://localhost:27017/recipe-app";

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then((x) => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany();
  })
  .then(() => {
    const newRecipe = Recipe.create({
      title: "Pasta Funghi & Panna",
      level: "Amateur Chef",
      ingredients: [
        "500 gr brown Funghi",
        "2 tablespoons salt",
        "1/3  soy cream (vegan italian panna))",
        "garlic",
        "chili"
      ],
      cuisine: "Italian",
      dishType: "main_course",
      image:
        "https://images.media-allrecipes.com/userphotos/720x405/815964.jpg",
      duration: 40,
      creator: "Serhii & Jose",
    });
    return newRecipe
  }) 

  .then(() =>{
    return Recipe.insertMany(data)
    .then( () => {
      console.log (data)
    })
  })
  .then( () => {
    console.log ('update succesful')
    return Recipe.findOneAndUpdate({title:'Rigatoni alla Genovese'}, {duration: 100})
     })

  .then( () => {
   
    console.log('Delete Carrot Cake successful')
    return Recipe.deleteOne({title: 'Carrot Cake'})
  } )
  .then( () =>{
    mongoose.connection.close()
  })
     
     .catch((error) => {
    console.error("Error connecting to the database", error);
  });
