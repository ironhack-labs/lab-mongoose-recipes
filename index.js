const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://127.0.0.1:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .set('strictQuery', true)
  .connect(MONGODB_URI)
  .then(x => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made
    Recipe.create({
      title: 'Arroz con leche', level: 'Easy Peasy', ingredients: ['arroz', 'leche', 'canela'], cuisine: 'asian',
      dishType: 'dessert', image: 'https://elcomercio.pe/resizer/BqBFwwYI2VeVSU2w6I3hpNERSHM=/980x528/smart/filters:format(jpeg):quality(75)/cloudfront-us-east-1.images.arcpublishing.com/elcomercio/M4AUUZMAAJHJRG4QREHD2S6JFM.jpg',
      duration: 120, creator: 'Persia', created: '2023-02-08'
    })
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made
    Recipe.insertMany(data)
      .then(() => {
        // data.forEach(element => {
        //   console.log(element.title)
        // });
        // Recipe.findOneAndUpdate({ title: 'Rigatoni alla Genovese' }, { duration: 100 }, { new: true })
        //   .then(pasta => console.log('La comida modificada es:', pasta))
        //   .catch(err => console.log('Tenemos un error', err))
        Recipe
          .deleteOne({ title: 'Carrot Cake' })
          .then(info => console.log('Borramos una receta', info))
          .catch(err => console.log('Cometimos un error', err))

      })

  })
