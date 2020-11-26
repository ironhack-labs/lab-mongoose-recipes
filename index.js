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
    const receta = {
      title: "Pan con tomate",
      level: "Easy Peasy",
      ingredients: ["Bread", "Tomatoe", "Salt", "Olive Oil"],
      cuisine: "Catalan",
      dishType: "other",
      image: "https://www.peretarres.org/media/4177/como-hacer-pa-amb-tomaquet-perfecto.jpg",
      duration: 5,
      creator: "i don't know"
    }
  
    return Recipe.create(receta)
  })
  .then((res) => {
    return Recipe.insertMany(data)
  })
  .then((res) => {
      return Recipe.findOneAndUpdate({title: 'Rigatoni alla Genovese'}, {duration: 100}, {new:true})
  })
  .then((res) => {
    return Recipe.deleteOne({title: "Carrot Cake"})
  }).then((res) => mongoose.connection.close())
  .catch(error => {
    console.error('Error connecting to the database', error);
  });
