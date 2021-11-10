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
    return Recipe.deleteMany()
  })
  .then(() => Recipe.syncIndexes())
  .then(() => {Recipe.create([{

  title: "Fritata",
  level: "UltraPro Chef",
  ingredients: ["spaguettis", "carbonara souce", "eggs"],
  cuisine: "yes",
  dishType: "main_course",
  image:
    "https://es.wikipedia.org/wiki/Frittata#/media/Archivo:Frittata02.jpg",
  duration: 90,
  creator: "Virginia Majuelos in 2021",
  

  }])

  })

  .then(() => Recipe.create(data))

  .then(() => Recipe.updateOne({title:"Rigatoni alla Genovese"},{duration:100}))

  .then(() => Recipe.deleteOne({title:"Carrot Cake"}))

  .then(() => mongoose.connection.close())
 
    // Run your code here, after you have insured that the connection was made
  
  .catch(error => {
    console.error('Error connecting to the database', error);
  });

