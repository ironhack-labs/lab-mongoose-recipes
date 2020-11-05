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
    // Run your code here, after you have insured that the connection was made
    // Recipe.create({
    //   title:"rattatooie",
    //   cuisine:"french",
    // }).then(()=>{
    //    console.log("Recipe created bro!")
    //   })

        Recipe.create(data)

        }).then(()=>{
             console.log("database imported bro!!!")
            })
    .then(()=>{
      Recipe.findOneAndUpdate({duration:100}).then(() =>{
        console.log("Success Update")
      })
      .then(()=>{
        Recipe.deleteOne({title:"Carrot Cake"}).then(()=>{
          console.log("The cake's gone bro!")
        })
      })
    })
 
  .catch(error => {
    console.error('Error connecting to the database', error);
  });
