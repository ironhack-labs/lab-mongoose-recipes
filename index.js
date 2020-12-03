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
        
    //// ITERATION 2: Create a recipe DONE. Commented to do iteration 3
    // const newRecipe = {
    //   title: "Pâtes au saumon",
    //   level: "UltraPro Chef",
    //   ingredients: [
    //     "200g de pâtes",
    //     "3 tranches de saumon",
    //     "1 échalote",
    //     "1 pot de crème fraîche",
    //     "1 pincée de sel",
    //     "1 pincée de poivre"
    //   ],
    //   cuisine: "Français",
    //   dishType: "main_course",
    //   image: "https://static.750g.com/images/600-600/26fa667a22b0845fe0d5e592c64e3cb3/pates-au-saumon-fume.png",
    //   duration: 20,
    //   creator: "Chef Marine Sanjuan"
    // }

    // Recipe.create(newRecipe);
    // console.log("vazy affiche le titre>>>", newRecipe.title);

    //// ITERATION 3:

    Recipe.insertMany(data);

    /// Version longue: 
    // (function loopTitle() {
    //   data.forEach( function(toto) {
    //     console.log(toto.title);
    //   });
    // })()

    // Version courte:
    data.forEach(toto => console.log(toto.title));


  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });

