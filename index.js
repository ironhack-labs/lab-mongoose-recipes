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
    useFindAndModify: false,
  })

  .then(self => {
    console.log(`Connected to the database: "${self.connection.name}"`);
    // Before adding any documents to the database, let's delete all previous entries
    return self.connection.dropDatabase();
  })

  .then(() => {
    // Run your code here, after you have insured that the connection was made
    
    Recipe.create({title: "tofu", level: "Easy Peasy", ingredients: ["tofu", "oil"], cuisine: "global", dishType: "other"}).then((recipe) => {
      console.log(recipe)
    })

    Recipe.insertMany(data).then((result) =>  {
      
      console.log(result.map(el => el.title) )

      Recipe.findOneAndUpdate({title: "Rigatoni alla Genovese"}, {$set: {duration: 100}}, {new: true}).then(() => {
        console.log("recipe updated")
      } ) 

      Recipe.deleteOne({title: "Carrot Cake"}).then(() => {
        console.log("Carrot Cake deleted")

        mongoose.connection.close(() => {
          console.log("connection closed")
      } )
      })
    })
  })

  .catch(error => {
    console.error('Error connecting to the database', error);
  });