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
  // .then(() => {
  //   // Recipe.create(
  //   //   {
  //   //   title: "Gâteau au chocolate",
  //   //   level: "Easy Peasy",
  //   //   ingredients: [
  //   //     "200g de chocolat",
  //   //     "100g de beurre",
  //   //     "3 oeufs",
  //   //     "50g de farine",
  //   //     "100g de sucre"
  //   //   ],
  //   //   cuisine: "French",
  //   //   dishType: "dessert",
  //   //   image: "https://images.media-allrecipes.com/userphotos/720x405/3489951.jpg",
  //   //   duration: 20,
  //   //   creator: "Chef Cailloux"
  //   // }
  //   // )
  //   .then(recipe => console.log('toto ', recipe.title))
  //   .catch(error => console.log(error));
  // })
  .then(() => {
    Recipe.insertMany(data)
    .then(recipe => console.log('toto ', data.forEach(recipe => console.log(recipe.title))))
    .catch(error => console.log(error))
    .then(() => {
      Recipe.findOneAndUpdate( { title: 'Rigatoni alla Genovese' }, {duration: 100}, {new: true} )
      .then(riga => console.log('success',riga))
      .catch(error => console.log(error))
      .then(() => {
        Recipe.deleteOne({ title: 'Carrot Cake' })
        .then(carrot => console.log('success2',carrot))
        .catch(error => console.log(error))
  
      })
    })
  })

  .catch(error => {
    console.error('Error connecting to the database', error);
  });





