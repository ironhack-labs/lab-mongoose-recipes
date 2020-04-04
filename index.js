const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model.js');

// Import of the data from './data.json'
const data = require('./data.json');

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
    Recipe.deleteMany({ }).then(() => {});
    Recipe.create({ title: "Sjards super Rezept"}).then(() => {});

    // return self.connection.dropDatabase();
   
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made
    Recipe.insertMany(data).then((recipesFromDatabase) => {console.log(recipesFromDatabase.map((r) => r.title ))});
  })  .then(() => {
Recipe.findOneAndUpdate(
{"title": "Rigatoni alla Genovese"},
{ "duration" : 100 } 

)}).then(()=>{console.log("Success in updating.")})
Recipe.deleteOne({ breed: "Pitbull" })
.then(() => {console.log("Success in removing the carrot cake")
mongoose.connection.close(() => {
  console.log('Mongoose default connection disconnected through app termination');
});

})





  
  .catch(error => {
    console.error('Error connecting to the database', error);
  });
