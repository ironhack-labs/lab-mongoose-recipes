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
    useUnifiedTopology: true,
    useFindAndUpdate: true
  })
  .then(self => {
    console.log(`Connected to the database: "${self.connection.name}"`);
    // Before adding any documents to the database, let's delete all previous entries
    //return self.connection.dropDatabase();
  })
  // .then(() => {
  //   // Run your code here, after you have insured that the connection was made  IT2
  //   return Recipe.create({
  //       title: 'Papas con mojo',
  //       level: 'Easy Peasy',
  //       ingredients: ['potatoes', 'water', 'salt', 'garlic', 'pepper', 'cumin', 'vinegar', 'oliveoil'],
  //       cuisine: 'Canaria',
  //       dishType: 'snack',
  //       image: 'https://mojopicon.com.es/img/papas-arrugadas-con-mojo-picon-241.jpg',
  //       duration: 20,
  //       creator: 'Adrian',
  //   })
  //   .then(recipe => {
  //     console.log(recipe.title)
  //   })
  // })

  //IT 3
  // .then(() => {
  //   return Recipe.insertMany(data)
  //     .then((result) => {
  //       data.forEach((recipe) => {
  //         console.log(recipe.title)
  //       })
  //     })
  // })

  //IT4
  // .then(() => {
  //   return Recipe.findOneAndUpdate({title: "Rigatoni alla Genovese"}, {duration: 100})
  //     .then(() => console.log('Rigatoni alla Genovese is updated'))
  //     .catch((saveErr) => console.error(`Save failed: ${saveErr}`))
  // })

  //IT5
  // .then(() => {
  //   return Recipe.deleteOne({ title: "Carrot Cake" })
  //       .then(() => console.log("Carrot Cake is deleted"))
  //       .catch((saveErr) => console.error(`Save failed: ${saveErr}`))
  // })

  //IT6 
  .then(() => {
    return mongoose.connection.close(() => {
        console.log("database is closed")
    })
  })
  
  .catch(error => {
    console.error('Error connecting to the database', error);
  });
