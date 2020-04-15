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
    Recipe.create({
        title: "Ramen",
        level: "Easy Peasy",
        ingredients: ["Fideos, Cerdo, Puerro, Caldo"],
        cuisine: "Japanese",
        disType: "main_course",
        duration: 30,
        creator: "Alvaro & Alejandro"
      })
      .then(newrecipe => {
        console.log("Se ha creado una nueva receta:", newrecipe.title)
        return Recipe.create(data)
      })
      .then(data => {
        data.forEach(elm => console.log("La receta es " + elm.title))
        return Recipe.updateOne({
          title: "Rigatoni alla Genovese"
        }, {
          duration: 100
        }, {
          new: true
        })
      })
      .then(updatedRecipe => {
        console.log("Registro actualizado", updatedRecipe)
        return Recipe.deleteOne({
          title: "Carrot Cake"
        })
      })
      .then(() => {
        console.log("Receta eliminada")
        mongoose.connection.close()
      })
  })

  .catch(error => {
    console.error('Error connecting to the database', error);
  });