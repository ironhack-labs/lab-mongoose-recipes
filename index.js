const mongoose = require('mongoose');
const Recipe = require('./models/Recipe'); // Import of the model Recipe from './models/Recipe'
const data = require('./data.js');  // Import of the data from './data.js'

// Connection to the database "recipeApp"
mongoose.connect('mongodb://localhost/recipeApp', { useNewUrlParser: true })
  .then(() => {
    return Recipe.create({
      title: "Vanille",
      level: "UltraPro Chef",
      ingredient: ["chocolate", "Marihuana"],
      cuisine: "Tibet",
      dishType: "Breakfast",
      duration: 25,
      creator: "Yoooooo Frank"
    });
  })
  .then(everest => {
    console.log("recipe added");
    console.log(everest);
    return Recipe.insertMany(data);
  })
  .then(() => {
    return Recipe.updateOne({ title: 'Rigatoni alla Genovese' }, { duration: 100 });
  })
  .then(() => {
    console.log("Recipe updated yoooo!");
    return Recipe.deleteOne({ title: "Carrot Cake" });
  })
then(() => {
  console.log("Recipe delete");
})

  .finally(() =>
    mongoose.connection.close(() => {
      console.log("It's done yooo!");
    })
  )
  .catch(err => {
    console.error(err);
  }); 
