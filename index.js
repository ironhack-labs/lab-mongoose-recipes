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
    // Before adding any documents to the database, let's delete all previous entries
    return self.connection.dropDatabase();
  })
  .then(() => {
    return Recipe.create({
      title: "Tiramisù",
      level: "Amateur Chef",
      ingredients: ["4 eggs", "100g sugar", "500g mascarpone", "300g savoiardi biscuits", "2 cups of espresso", "Unsweetened cocoa powder to taste"],
      cuisine: "Italian",
      dishType: "dessert",
      image: "https://ricetta.it/Uploads/Imgs/tiramisu-classico.jpg",
      duration: 40,
      creator: "Chef Elia"
    })
    .then(response => console.log("Data inserted succesfully"))
    .then(err => console.error(`Error: ${err}`))
  })
  .then(() => {
    return Recipe.insertMany(data)
    .then(response => console.log("Data inserted succesfully"))
    .catch(err => console.error(`Error: ${err}`));
  })
  .then(() => {
    return Recipe.findOneAndUpdate({title: "Rigatoni alla Genovese"}, {duration: 100})
    .then(response => console.log("Data modified succesfully"))
    .catch(err => console.error(`Error: ${err}`));
  })
  .then(() => {
    return Recipe.deleteOne({title: "Carrot Cake"})
    .then(response => console.log("Carrot Cake was deleted succesfully"))
    .catch(err => console.error(`Error: ${err}`));
  })
  .then(() => {
    return mongoose.connection.close();
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });
