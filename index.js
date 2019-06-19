const mongoose = require('mongoose');
const Recipe = require('./models/Recipe'); // Import of the model Recipe from './models/Recipe'
const data = require('./data.js');  // Import of the data from './data.js'


mongoose.connect('mongodb://localhost/recipeApp', { useNewUrlParser: true })

console.log('1 - Connected to Mongo!');

Recipe.deleteMany({}).then((res) => {

  console.log('2 - Deleted ' + res.n + ' document(s)');


  Recipe.insertMany(data).then((res) => {

    console.log("3 - Data inserted");

    let promise1 = Recipe.create({ title: "blanquessttqssdqdqdsdqse de veau", cuisine: "french" });
    let promise4 = Recipe.updateOne({ title: 'Rigatoni alla Genovese' }, { duration: 100 });
    let promise5 = Recipe.deleteOne({ title: "Carrot Cake" });

    Promise.all([promise1, promise4, promise5])

      .then(values => {

        console.log("4 - First recipe created");
        console.log("4 - Rigatoni recipe updated");
        console.log("4 - Carrot cake recipe deleted");

        mongoose.disconnect().then((err) => console.log("5 - Database disconnected"))

      })
  })

    .catch(err => console.log("error"))

}).catch(err => {

  console.error('Error connecting to mongo', err);

});

