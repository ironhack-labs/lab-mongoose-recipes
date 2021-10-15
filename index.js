const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');




const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(self => {
    console.log(`Connected to the database: "${self.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    const myRecipe = {
      title: "Tortilla de Patatas",
      level:'Easy Peasy', 
      ingredients: ["eggs", "potatoes", "onion"],
      cuisine: "Traditional",
      dishType: 'main_course',
      image: "images/tortilla.jpeg",
      duration: 30,
      creator: "Miss Morales",
      // created:  {default: Date.now},
       
    }
    //console.log(myRecipe.title)

    Recipe.create(myRecipe);


    return Recipe.deleteMany()
  })

 
  .then(() => {
    Recipe.insertMany(data)
    // Run your code here, after you have insured that the connection was made
    for(i = 0; i < data.length; i ++) {
      console.log(data[i].title)
    }


  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });

  
