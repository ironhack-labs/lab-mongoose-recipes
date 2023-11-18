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
    return Recipe.create(data);
  })

  .then(() => {
    // Run your code here, after you have insured that the connection was made 
    return Recipe.create({
      title:"Cinnamon Rolls",
      level: "Amateur Chef",
      ingredients: ["2 Eggs", "500gr Wheat flour", "80gr Butter", "20gr baking powder", "100gr Sugar","30gr of cinnamon"],
      cusine: "Swedish",
      dishType: "dessert",
      image: "https://imag.bonviveur.com/cinnamon-rolls_1000.webp",
      duratarion: 30,
      creator: "Chef Hector",
      created: Date.now()
    })      
  })

  .then(() => {
    return Recipe.insertMany([
      {
        title: "Spaghetti Bolognese",
        level: "Amateur Chef",
        ingredients: ["400gr Spaghetti", "200gr Ground Beef", "1 Onion", "2 cloves Garlic", "400ml Tomato Sauce", "1 tsp Oregano", "Salt and Pepper to taste"],
        cuisine: "Italian",
        dishType: "main_course",
        image: "https://w6h5a5r4.rocketcdn.me/wp-content/uploads/2019/05/espaguetis-a-la-bolonesa-1080x671.jpg",
        duration: 45,
        creator: "Chef Maria",
        created: Date.now()
      },
      {
        title: "Chicken Caesar Salad",
        level: "Amateur Chef",
        ingredients: ["200gr Chicken Breast", "1 head Romaine Lettuce", "Croutons", "Parmesan Cheese", "Caesar Dressing"],
        cuisine: "American",
        dishType: "main_course",
        image: "https://s23209.pcdn.co/wp-content/uploads/2023/01/220905_DD_Chx-Caesar-Salad_051-1024x1536.jpg",
        duration: 20,
        creator: "Chef John",
        created: Date.now()
      }
  ])      
    })

  .then(() => {
     return Recipe.findOneAndUpdate({ title: "Rigatoni alla Genovese" }, { duration: 100 }, { new: true })
  })

  .then(() => {
      return Recipe.deleteOne({ title: 'Carrot Cake' })
  })
  
  .then(() => {
        mongoose.connection.close();
      })

  .catch(error => {
    console.error('Error connecting to the database', error);
  });
