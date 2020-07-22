const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const macarrones = {
  title: "Macarrones",
  level: "Easy Peasy",
  ingredients: ["Lots of macarroni", "Solis tomato", "minced meat"],
  cuisine: "worldwide",
  dishType: "main_course",
  image: "https://www.hogarmania.com/archivos/201909/macarrones-compota-editorial-1280x720x80xX.jpg",
  duration: 30,
  creator: "Chef Sergio"
}

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
    //ITERATION 2: metemos la receta en la data base
    Recipe.create(macarrones)
      .then((recipe) => console.log(`The ${recipe.title} recipe has been created`))
      //ITERATION 3: insertamos todas las que hay en data (linea 6, que apunta al data.json)
      .then(() => Recipe.insertMany(data))
      //ITERATION 4: buscamos en la DB la que tiene ese título (primer parámetro) y le cambiamos la duration (segundo parámetro).
      //Para comprobarlo, pasamos un tercer parámetro new: true
      .then(() => Recipe.findOneAndUpdate({
        title: "Rigatoni alla Genovese"
      }, {
        duration: 100
      }, {
        new: true
      }))
      .then(update => console.log("The damn rigatoni recipe has been updated", update))
      //ITERATION 5: eliminamos el documento que tenga el title pasado
      .then(() => Recipe.deleteOne({
        title: "Carrot Cake"
      }))
      .then(console.log("Carrot cake is NO MORE"))
      //ITERATION 6: desconectamos por último la DB
      .then(() => mongoose.connection.close())
      .then(console.log("The DB it's disconnected, muahahah"))
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });