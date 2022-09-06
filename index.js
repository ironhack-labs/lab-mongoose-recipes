const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://127.0.0.1:27017/recipe-app';

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

    // _____________________________________________________
    //|                ↓ LEER  ANTES ↓                      |
    //|   Cambie la direccion de -mongodb- por 127.0.0.1,   |
    //|   pues con localhost no lograba conectarme          |
    //|               me mostraba esto:                     |
    //|       Error connecting to the database              |
    //|       MongooseServerSelectionError:                 |   
    //|       connect ECONNREFUSED ::1:27017                |
    //|_____________________________________________________|
    
    let recipe ={
      title: "Asian Glazed Chicken Thighs",
      level: "Amateur Chef",
      ingredients: [
      "1/2 cup rice vinegar",
      "5 tablespoons honey",
      "1/3 cup soy sauce (such as Silver Swan®)",
      "1/4 cup Asian (toasted) sesame oil",
      "3 tablespoons Asian chili garlic sauce",
      "3 tablespoons minced garlic",
      "salt to taste",
      "8 skinless, boneless chicken thighs"
      ],
      cuisine: "Asian",
      dishType: "main_course",
      image: "https://images.media-allrecipes.com/userphotos/720x405/815964.jpg",
      duration: 40,
      creator: "Chef LePapu"
    }

    Recipe.create(recipe)
      .then(console.log(recipe.title))
      .catch(err => console.log(err))

    Recipe.insertMany(data)
      .then(recipes =>{
        recipes.forEach(recipe => console.log(recipe.title))
          
          Recipe.findOneAndUpdate({title:"Rigatoni alla Genovese"}, {duration:100})
            .then(console.log("update data"))
            .catch(err => console.log(err))

          Recipe.deleteOne({title:"Carrot Cake"})
            .then(console.log("delete recipe"))
            .catch(err => console.log(err))
        
      })
      .catch(err => console.log(err))
  })

  .catch(error => {
    console.error('Error connecting to the database', error)
  })

  process.on('SIGINT', () => {
    mongoose.connection.close(() => {
      console.log('Mongoose default connection disconnected through app termination')
      process.exit(0)
    })
  })
