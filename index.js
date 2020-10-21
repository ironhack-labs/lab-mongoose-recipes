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
    /* return self.connection.dropDatabase(); */
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });



// Crear el objeto

//Iteracion 2

(async () => {
  try {
    const receta = await Recipe.create({
      title: "Coulant de Chocolate",
      level: "UltraPro Chef",
      ingredients: ["chocolat", "eggs", "flavour", "butter"],
      cuisine: "kitchen",
      dishType: "dessert",
      duration: 70,
      cretor: "Christian",
    });
    console.log(`This recipe was saved ${receta}`);
  } catch (error) {
    console.log(error.message);
  }

})();

// Iteracion 3

(async () => {
  try {
    const promise = await Recipe.insertMany(data);
    const titulos = await promise.map((titulosp) => {
      console.log(titulosp.title);
    })
  } catch (error) {
    console.log(error.message);
  }

})();

// Iteracion 4

(async () => {
  try {
    const update = await Recipe.findOneAndUpdate(
      {title: "Rigatoni alla Genovese"},
      {duration: 100},
      {new: true}
    )
    console.log(update);
  } catch (error) {
    console.log(error.message);
  }

})();

// Iteracion 5

(async () => {
    try {
      const deleted = await Recipe.deleteOne({title: "Carrot Cake"})
      console.log(deleted)
    } catch (error) {
      console.log(error.message);
    }
})();

// Iteracion 6

mongoose.connection.close(() => {
  console.log('Mongoose default connection disconnected through app termination');
})



