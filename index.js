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
    // Run your code here, after you have insured that the connection was made

    // Iteration 2
    
    return Recipe.create ({
      title: "Palacsinta",
      level: "Easy Peasy",
      ingredients: ["flour", "salt", "eggs", "milk", "sugar", "soda water", "sunflower oil for frying"],
      cuisine: "Hungarian",
      dishType: "dessert",
      image: "https://www.club43.hu/Images/Products/palacsinta1.jpg",
      duration: 30,
    })
  })

    // Iteration 3

  .then(() => {
    return Recipe.insertMany(data)
  })

    // Iteration 4 

  .then(() => {
    return Recipe.findOneAndUpdate( { title: "Rigatoni alla Genovese" }, { duration: 100 }, { new: true } )
  })

    // Iteration 5

  .then(() => {
    return Recipe.deleteOne( { title: "Carrot Cake" } )
  })

    // Iteration 6

  .then(() => mongoose.connection.close())


  .catch(error => {
    console.error('Error connecting to the database', error);
  });
