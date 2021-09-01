const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

//1. Si está fuera de un then está descontrolado
//2. Recibe como parametro el return del anterior
//3. Espera a que se complete el return del anterior

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
  .then(() => {
    return Recipe
      .create(
        { title: "Tarta de queso", level: 'Amateur Chef', ingredients: ["queso", "huevos", "mermelada"], cuisine: "española", dishType: "other", image: "https://www.recetasderechupete.com/wp-content/uploads/2019/06/tarta-de-queso-mejor-Espa%C3%B1a.jpg", duration: 10, creator: "Miguel", created: Date.now() }
      )
  })

  .then((recipe) => {
    console.log(`Este postre se titula ${recipe.title}`)
    return Recipe.create(data)
  })

  .then(recipes => recipes.forEach(elm => console.log(`el nombre del postre es ${elm.title}`)))

  .then(() => Recipe.findOneAndUpdate({ title: "Rigatoni alla Genovese" }, { duration: 100 }))

  .then(() => Recipe.deleteOne({ title: "Carrot Cake" }))

  .then(() => mongoose.connection.close())

  .catch(error => {
    console.error('Error connecting to the database este es el ERROR => OJITO', error);
  });
