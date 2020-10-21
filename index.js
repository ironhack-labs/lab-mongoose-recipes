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
    useFindAndModify: false
  })
  .then(self => {
    console.log(`Connected to the database: "${self.connection.name}"`);
    // Before adding any documents to the database, let's delete all previous entries
    return self.connection.dropDatabase();
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made
      const recipe = Recipe.create({
        title: 'Tortilla',
        level: 'Easy Peasy',
        ingredients: ['Eggs', 'Potato', 'Onion'],
        cuisine: 'Spanish' ,
        dishType:'main_course',
        creator: 'Adria'
      }).then(() => {
        return Recipe.insertMany(data)
      }).then((result) => {
        result.forEach((element) => {
          console.log(element.title)
        })
        return Recipe.findOneAndUpdate(
          { title: "Rigatoni alla Genovese" },
          { duration: 100 },
          { new: true },
          )
          .then(() => {
           return Recipe.deleteOne({title: 'Carrot Cake'})
          })
      }).catch((e) => { console.log(e) })
      })
      
  .catch(error => {
    console.error('Error connecting to the database', error);
  });

  
