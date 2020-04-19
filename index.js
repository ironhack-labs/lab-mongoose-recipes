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
      title: "Samoussas aux légumes",
      level: "Easy Peasy",
      ingredients: ["feuilles de brick", "patates", "carottes", "petits pois", "oignons", "cumin", "curry", "sel", "poivre"],
      dishType: "main_course",
      duration: 60,
    });
    Recipe.insertMany(data)
      .then(dbResponse => {
        const nomsRecette = dbResponse.map(a => a.title)
        console.log({
          nomsRecette
        });
        Recipe.findOneAndUpdate({
          title: "Rigatoni alla Genovese"
        }, {
          $set: {
            duration: 100
          }
        }, {
          new: true
        })
          .then((dbResponse) => {
            console.log(dbResponse);
          })
          .catch((dbErr) => {
            console.log(dbErr)
          });
        Recipe.deleteOne({
          title: "Carrot Cake"
        })
          .then((dbResponse) => {
            console.log(dbResponse)
          })
          .catch((dbErr) => {
            console.log(dbErr)
          });
        mongoose.connection.close()
      }).catch(dbErr => {
        console.log(dbErr);
      })
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });