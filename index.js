const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

const chickenRecipe = {
  title: "Pollo al Horno",
  level: "Amateur Chef",
  ingredients: ["1 pollo","Salsa soja","Salsa picante","Vinagre de manzana","Pimienta","Sal","Ajo","Salsa de tomate","Tomillo"],
  cuisine: "Antoine's",
  dishType: "main_course",
  duration: 45,
  creator: "Antoine Rolland",
  created: "2020-05-25"
}

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(self => {
    console.log(`Connected to the database: "${self.connection.name}"`);
    // Before adding any documents to the database, let's delete all previous entries
    return self.connection.dropDatabase();
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made
    db => console.log(`Connected to database ${db.connection.name}`)
    Recipe.create(chickenRecipe).then(rec => console.log(rec.title)).catch()
    Recipe.insertMany(data).then().catch()
    .then(() => {
      Recipe.updateOne({"duration":220},{"duration":100}).then(console.log("Updated !")).catch()
      Recipe.deleteOne({"title":"Carrot Cake"}).then(console.log("Deleted !")).catch()
    }).catch()
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });

  setTimeout(() => {
    mongoose.connection.close(() => {
      console.log("Connection closed")
      process.exit(0)
    })
  },1500)