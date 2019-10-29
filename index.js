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

  Recipe.create({ title: 'Kebab', level: 'mierda', ingredients: ['a saber 1', 'a saber 2', 'a saber 3'], cuisine: 'Turca', dishType: 'Comida rapiada', duration: 30, creator: 'MR. Kebab'  })
  .then(user => { console.log('The user is saved and its value is: ', user) })
  .catch(err => { console.log('An error happened:', err) });

  Recipe.insertMany(data)
    .then( data => {
      console.log(`Fue guay ${data}`)
      Recipe.updateOne({ title: 'Rigatoni alla Genovese'}, { duration: 100 })
      .then(data =>  {
        console.log(`Fue guay ${data}`)
        Recipe.deleteOne({ title: 'Carrot Cake'})
        .then(data => {
          console.log(`Fue guay ${data}`)
          mongoose.connection.close().then(data => console.log(data)).catch(data => console.log(data))
        })
        .catch(data => console.log(data));
      })
      .catch(data => console.log(data))
    })
    .catch( data => console.log(`fue mal: ${data}`))


