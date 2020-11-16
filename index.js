const mongoose = require('mongoose');
let jsonData = require("./data.json");

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
    // Run your code here, after you have insured that the connection was made
    let data = {title: "Ensalada Cesar", level: "Amateur Chef", ingredients: "Ensalada, Aderezo", 
    cuisine: "Vegetariana", dishType: "other", duration: 60, creator: "Carlos"};
    let promise1 = Recipe.create(data)
              .then(recipie => console.log('The title of the recipie is: ', recipie.title))
              .catch(error =>
                console.log('An error happened while saving the recipie:', error)
              );
    let promise3, promise4;
    let promise2 = Recipe.insertMany(jsonData)
            .then(recipies => {
              recipies.forEach(recipie => {
              console.log('The title of the recipie is: ', recipie.title);});
              promise3 = Recipe.findOneAndUpdate({title: "Rigatoni alla Genovese"}, {duration: 100})
                                          .then(()=>{
                                            console.log("Recipie updated");
                                          })
                                          .catch(err => {console.log(err);});
              promise4 = Recipe.deleteOne({title: "Carrot Cake"})
                                          .then(()=>{
                                            console.log("Recipie deleted");
                                          })
                                          .catch(err => {console.log(err);});
            })
            .catch(error =>
              console.log('An error happened while saving the recipies:', error)
            );
    

    Promise.all([promise1, promise2, promise3, promise4])
                .then(() => {
                  mongoose.connection.close();
                }
                )
                .catch(()=> {
                  mongoose.connection.close();
                });

  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });
