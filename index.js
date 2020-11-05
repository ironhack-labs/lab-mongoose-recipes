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
  })
  
  process.on('SIGINT', () => {
    mongoose.connection.close(() => {
      console.log('Mongoose default connection disconnected through app termination');
      process.exit(0);
    });
  });
  
  // .then(self => {
  //   console.log(`Connected to the database: "${self.connection.name}"`);
  //   Before adding any documents to the database, let's delete all previous entries
  //   return self.connection.dropDatabase();
  // })
  // .then(() => {
    // Run your code here, after you have insured that the connection was made
  
   /*  Iteration 5
      Recipe.deleteOne({ title: 'Carrot Cake'})
      .then((cookedCarrots) => console.log(cookedCarrots))
      .catch((saveErr) => console.log(saveErr)) */

/*  Iteration 4
    Recipe.updateOne({title : 'Rigatoni alla Genovese'}, {duration: 100})
      .then((updateResults) => console.log(updateResults))
      .catch((saveErr) => console.log(saveErr)) */


    /* Iteration 3
      Recipe.insertMany(data)
      .then((results) => console.log(`Inserted the recipes. Here is the addition: ${data}`))
      .catch((saveErr) => console.error('save Failed'))
 */
/*  Iteration 2
    const risotto = {
      "title": "Bosce Risotto",
      "level": "UltraPro Chef",
      "ingredients": [
        "200 gr Basmati rice",
        "1 Brocoli",
        "1 red and 1 white onion",
        "3 Garlic cloves",
        "150gr Mushrooms",
        "40cl Extra Virgin oil",
        "4 types of pepper (green, black, jamaican, white)",
        "220 gr Pork tenderloin p/person",
        "Orange skin zest",
        "Provence herbs, thym and origano"
      ],
      "cuisine": "Italian",
      "dishType": "main_course",
      "image": "https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fimages.media-allrecipes.com%2Fuserphotos%2F4398987.jpg&w=596&h=399.32000000000005&c=sc&poi=face&q=85",
      "duration": 90,
      "creator": "Chef Pavaroti"
    };
 
    Recipe.create(risotto)
    .then((results) => console.log(`Saved new cat: ${results}`))
    .catch((saveErr) => console.error(`Save failed: ${saveErr}`));
*/
  // }) 

  // .catch(error => {
  //   console.error('Error connecting to the database', error);
    // });

  