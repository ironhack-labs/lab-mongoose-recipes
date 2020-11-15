//Packacges
const mongoose = require('mongoose');

//Models
const Recipe = require('./models/Recipe.model.js');

//Data
const data = require('./data');



const MONGODB_URI = 'mongodb://localhost:27017/recipe-app'

// Connection to the database "recipe-app"

//Iteration 2: create ONE recipe

// mongoose
//   .connect(MONGODB_URI, {
//     useCreateIndex: true,
//     useNewUrlParser: true,
//     useUnifiedTopology: true
//   })
//   .then(self => {
//     console.log(`Connected to the database: "${self.connection.name}"`);
//     // Before adding any documents to the database, let's delete all previous entries
//     return self.connection.dropDatabase(); //TODO: comment this line later
//   })
//   .then(() => {
//     // Run your code here, after you have insured that the connection was made
    
//     Recipe.create(data[0],(error, recipe) => {
//       if (error) {
//         console.log("Error on insertion: ", error);
//         return;
//       } else {
//         console.log('Succesfully inserted: ', recipe.title);
//       }
//     });
//   })
//   .catch(error => {
//     console.error('Error connecting to the database', error);
//   });

//Iterarion 3: insert ALLrecipes

mongoose
  .connect(MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(self => {
    console.log(`Connected to the database: "${self.connection.name}"`);
    // Before adding any documents to the database, let's delete all previous entries
    return self.connection.dropDatabase(); //TODO: comment this line later
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made
    
    Recipe.insertMany(data)
    .then([...data].forEach(elem => {console.log("Inserted: ", elem.title)}))
    .catch(error => {
      console.error('Error on insertion', error)});
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });

