const mongoose = require('mongoose');
const Recipe = require('./models/Recipe'); // Import of the model Recipe from './models/Recipe'
const data = require('./data.js');  // Import of the data from './data.js'

//Option with a sequence of promises and promise all (when promises are independant)

/* 
mongoose.connect('mongodb://localhost/recipeApp', { useNewUrlParser: true }).then((res => {

  console.log('1 - Connected to Mongo! at ' + currentTime());

  Recipe.deleteMany({}).then((res) => {

    console.log('2 - Deleted ' + res.n + ' document(s) at ' + currentTime());


    Recipe.insertMany(data).then((res) => {

      console.log("3 - Data inserted at " + currentTime());

      let promise1 = Recipe.create({ title: "blanquessttqssdqdqdsdqse de veau", cuisine: "french" });
      let promise4 = Recipe.updateOne({ title: 'Rigatoni alla Genovese' }, { duration: 100 });
      let promise5 = Recipe.deleteOne({ title: "Carrot Cake" });

      Promise.all([promise1, promise4, promise5])

        .then(values => {

          console.log("4 - Database operations completed at " + currentTime());
          console.log(" a - First recipe created");
          console.log(" b - Rigatoni recipe updated");
          console.log(" c - Carrot cake recipe deleted");

          mongoose.disconnect().then((err) => console.log("5 - Database disconnected at " + currentTime()))

        })
    })

      .catch(err => console.log("error"))

  })
})).catch(err => {

  console.error('Error connecting to mongo', err);

}); */

//Alternative version with bulkWrite (for three operations)

mongoose.connect('mongodb://localhost/recipeApp', { useNewUrlParser: true }).then((res => {

  console.log('1 - Connected to Mongo! at ' + currentTime());

  Recipe.deleteMany({}).then((res) => {

    console.log('2 - Deleted ' + res.n + ' document(s) at ' + currentTime());


    Recipe.insertMany(data).then((res) => {

      console.log("3 - Data inserted at " + currentTime());


      Recipe.bulkWrite([


        { insertOne: { document: { title: "blanquette de veau", cuisine: "french" } } },
        { updateOne: { filter: { title: 'Rigatoni alla Genovese' }, update: { duration: 100 } } },
        { deleteOne: { filter: { title: 'Carrot Cake' } } }
      ])
        .then(values => {

          console.log("4 - Database operations completed at " + currentTime());
          console.log(" a - First recipe created");
          console.log(" b - Rigatoni recipe updated");
          console.log(" c - Carrot cake recipe deleted");

          mongoose.disconnect().then((err) => console.log("5 - Database disconnected at " + currentTime()))

        })
    })

      .catch(err => console.log("error"))

  })
})).catch(err => {

  console.error('Error connecting to mongo', err);

});

//Utily function to deliver current hours, min and sec

function currentTime() {

  let today = new Date();
  let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds() + ":" + today.getMilliseconds();
  return time;
}

