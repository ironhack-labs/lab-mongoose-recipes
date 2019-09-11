const mongoose = require('mongoose');
const Recipe = require('./models/Recipe'); // Import of the model Recipe from './models/Recipe'
const data = require('./data.js');  // Import of the data from './data.js'

// Connection to the database "recipeApp"
mongoose.connect('mongodb://localhost/recipeApp', { useNewUrlParser: true })
  .then(() => {
    console.log('Connected to Mongo!');
  }).catch(err => {
    console.error('Error connecting to mongo', err);
  });
mongoose.set('useCreateIndex', true);

Recipe.create({
  title: "Papas arrugadas con mojo verde",
  level: "UltraPro Chef",
  ingredients: ["Papas negras", "Sal gruesa", "Agua", "Mojo verde preparado"],
  cuisine: "Canaria",
  dishType: "Snack",
  image: "http://3.bp.blogspot.com/-ZTOHXgQ6Pqc/UyJtNL3hfnI/AAAAAAAAAMQ/il2kNtSlVuU/s1600/papas+mojo+cilantro.JPG",
  duration: 12,
  creator: "Paula Romero",
  created: "2019-09-10"
}).then(createdRecipe => console.log(createdRecipe.title));

Recipe.insertMany(data)
  .then(docs => {
    docs.forEach(doc => console.log(doc.title))

    let promise1 = Recipe.updateOne(
      { title: "Rigatoni alla Genovese" },
      { duration: 100 }
    ).then(console.log("Duration updated...!"));

    let promise2 = Recipe.deleteOne(
      { title: "Carrot Cake" },
    ).then(console.log("Removed...!"));

    Promise.all([promise1, promise2])
      .then(values => {
        console.log(values);
        mongoose.connection.close();
      })
  });



