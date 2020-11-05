const mongoose = require('mongoose');
const recipesData = require("./data.json");

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

mongoose.set('useFindAndModify', false);

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

    //Iteration3 
    Recipe.insertMany(recipesData)
      .then((results) => {
        results.forEach((result) => {
          console.log(`Recipe title: ${result.title}`);
        });

        //Iteration4 w/ Thomas begin
        Recipe.findOneAndUpdate({
            title: 'Rigatoni alla Genovese'
          }, {
            $set: {
              duration: 100
            }
          }, {
            new: true
          })
          .then(() => console.log("data modified succesfully"))
          .catch(err => console.error(`Error: ${err}`));

        //iteration 5
        Recipe.deleteOne({
            title: 'Carrot Cake'
          }, {
            new: true
          })
          .then(() => console.log("data deleted"))
          .catch(err => console.error(`Error: ${err}`));

          mongoose.connection.close()
      });
  })

  .catch(error => {
    console.error('Error connecting to the database', error);
  });
