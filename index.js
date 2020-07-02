const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

const welsh = {
  title: "Welsh",
  level: "Easy Peasy",
  type: [ "cheddar", "beer", "ham", "bread", "eggs" ],
  cuisine: "Chti",
  dishType: "main_course",
}

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

    Recipe.create(welsh)
    .then(sucess => {
      console.log(welsh.title);
      Recipe.insertMany(data)
      .then(sucess => {
        data.forEach((el)=> console.log (el.title))
        Recipe.findOneAndUpdate(
          {title: "Rigatoni alla Genovese"},
          { duration: 100})
        .then(success => {
          console.log ("receipe updated")
          Recipe.deleteOne( {title: "Carrot Cake"})
          .then(success => {
            console.log("Receipe deleted")
            mongoose.connection.close(()=> {
              console.log("ouaiiis")
            })
          })
        })
      }) 
    })
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });



  