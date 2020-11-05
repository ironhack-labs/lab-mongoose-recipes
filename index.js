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
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(self => {
    console.log(`Connected to the database: "${self.connection.name}"`);
    // Before adding any documents to the database, let's delete all previous entries
    return self.connection.dropDatabase();})
  .then(() => {return Recipe.create(recipeObj)})
  .then(()=>{return Recipe.insertMany(data)})
  .then(()=>{return Recipe.findOneAndUpdate({title: "Rigatoni alla Genovese"}, {duration: 100})})
  .then(()=>{return Recipe.deleteOne({title: 'Carrot Cake'})})
  .catch(error => {console.error('Error connecting to the database', error);});

const recipeObj = {
  title: "Sweet potato soup",
  level: "Easy Peasy",
  ingredients:["Sweet potato", "Carrots", "Red Onions", "Paprika", "Garlic", "Parsly", "Cayenne", "Vegetable Stock", "Water"],
  cuisine: "Sophie's cuisine",
  dishType: "soup",
  duration: 20,
  creator: "Sophie",
}

process.on("SIGINT", () => {
  mongoose.connection.close(() => {
    console.log(`Mongo connection disconnected`);
    process.exit(0);
  });
}); 