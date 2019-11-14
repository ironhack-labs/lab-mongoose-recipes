const mongoose = require('mongoose');
const Recipe = require('./models/Recipe'); // Import of the model Recipe from './models/Recipe'
const data = require('./data.js');  // Import of the data from './data.js'

// Connection to the database "recipeApp"
mongoose.connect('mongodb://localhost/recipeApp', {
    useUnifiedTopology: true,
    useNewUrlParser: true
  })
  .then(() => {
   
  return Recipe.create({
    title: "Tartara",
    level: "Pro",
    ingredient: ["Galletas Maria", "Amor"],
    cuisine: "La mia",
    dishType: "Desayuno",
    duration: 20,
    creator: "David San"
  });
})
.then(everest => {
  console.log("Recepta creada");
  console.log(everest);
  return Recipe.insertMany(data);
})
.then(() => {
  return Recipe.updateOne({ title: 'Rigatoni alla Genovese' }, { duration: 100 });
})
.then(() => {
  console.log("Exitooo esta actualizado!");
  return Recipe.deleteOne({ title: "Carrot Cake" });
})
then(() => {
console.log("Carrot Cake elminada");
})

.finally(() =>
  mongoose.connection.close(() => {
    console.log();
  })
)
.catch(err => {
  console.error(err);
}); 