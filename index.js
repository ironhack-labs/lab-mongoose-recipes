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
    return self.connection.dropDatabase();
  })
  .then(() => {
    Recipe.create({ title: "Pizza", level: "Easy Peasy", ingredients: ["tomatosauce"], cuisine: "Italian", dishType: "main_course", duration: 170, creator: "Francesco Saccone" })
      .then((Recipe) => {
        console.log(Recipe.title)
      })
      .then(() => {
        Recipe.insertMany(data).then((recipesFromDatabase) => {
          recipesFromDatabase.map((r) => {
            console.log(r.title)})
    
          Recipe.findOneAndUpdate({ title : "Rigatoni alla Genovese"}, { duration : 100 }, { new : true }).then((recipeUpdated) =>{
            console.log("The updated value is : " + recipeUpdated.duration)
          })

          Recipe.deleteOne( { name : "Carrot Cake" }, function err() {} ).then(() => {
            console.log("Carrot Cake has been deleted")
            mongoose.connection.close(() => {
              console.log('Mongoose default connection disconnected through app termination');
          })

          })
      })

  })})
  .catch(error => {
    console.error('Error connecting to the database', error);
  });

