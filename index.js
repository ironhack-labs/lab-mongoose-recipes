const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');
const dataIt2 = {
  title:"tarte tatin",
  cuisine: "french",
}

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

console.log(data)

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
    // Run your code here, after you have insured that the connection was made
    Recipe.create(dataIt2)
       .then(recipe => {console.log(recipe.title)})
       .catch(error => console.log(error))
    Recipe.insertMany(data)
       .then(
          recipes => {
            console.log(recipes.map(recipe => recipe.title))

            Recipe.findOneAndUpdate({title: "Rigatoni alla Genovese"}, {duration: 100})
              .then(
                update => {
                  console.log("you're too strong !")

                  Recipe.deleteOne({title: "Carrot Cake"})
                    .then(
                      del => {
                        console.log("better than when you did a DELETE * from TOTO WHERE TRUE")
                        mongoose.connection.close(() => {
                          console.log('Mongoose default connection disconnected through app termination')})
                          .then(succes => "db closed")
                          .catch(error => "db closed failed")
                          // seems not to work with then and cacthg, but is connection is closed

                      }
                    )
                    .catch(error => console.log("Arf..."))

                }
              )
              .catch(error => "i'm a looser !")

          })
       .catch(error => console.log(error))
  })
  .catch(error => {
    console.error('Error connecting to the database');
  });
