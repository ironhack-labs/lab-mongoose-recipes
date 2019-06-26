const mongoose = require('mongoose');
const Recipe = require('./models/Recipe'); // Import of the model Recipe from './models/Recipe'
const data = require('./data.js');  // Import of the data from './data.js'

// Connection to the database "recipeApp"

let promise0 = Recipe.deleteMany();

let promise1 = Recipe.create({
  title: "Pizza",
  level: "Easy Peasy",
  cuisine: "Italian"
})
// .then(value => {
//   console.log(value)
// })
// .catch(err => {
//   console.log(err)
// })

let promise2 = Recipe.insertMany(data)
// .then(value => {
//   console.log(value)
// })
// .catch(err => {
//   console.log(err)
// })

let promise3 = Recipe.findOneAndUpdate({ title: "Rigatoni alla Genovese" }, { duration: 100 },{new: true})
// .then(value => {
//   console.log("Update field");
// })
// .catch(err => {
//   console.log(err)
// });

let promise4 = Recipe.deleteOne({ title: "Carrot Cake" })
// .then(value => {
//   console.log("Delete Recipe Success");
// })
// .catch(err => {
//   console.log(err)
// });

mongoose.connect('mongodb://localhost/recipeApp', { useNewUrlParser: true })
  .then(() => {
    console.log('Connected to Mongo!');
    return Promise.all([promise1, promise2, promise3, promise4])
      .then(values => {
        console.log("All promises success");
        console.log(values)
        mongoose.connection.close();
      })
      .catch(err => console.error(err));
  }).catch(err => {
    console.error('Error connecting to mongo', err);
  });
