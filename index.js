
console.log("working...")



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
    // useUnifiedTopology: true
  })
  .then(self => {
    console.log(`Connected to the database: "${self.connection.name}"`);
    // Before adding any documents to the database, let's delete all previous entries
    return self.connection.dropDatabase();
  })
  
  .catch(error => {
    console.error('Error connecting to the database', error);
  });


    // ITERATION 2

    Recipe.create({
      title: "grilled chicken",
      level: "Amateur Chef",
      ingredients: ["chicken", "salt", "pepper", "lemon"],
      cuisine: "American",
      dishType: "main_course",
      duration: 30,
      creator: "Abdy Guevara",

    });

    console.log("added recipe")

    Recipe.insertMany(data)
      .then((res) => {
        console.log('Data added', res)


      })
      .catch(() => {
        console.log('Error connecting to the database', error);
      })


    Recipe.findOneAndUpdate({ title: "Rigatoni alla Genovese" }, {$set: {duration: 100} })
      .then((res) => {
        console.log('Data updated', res);

      })
      .catch(() => {
        console.log('Error connecting to the database', error);
      })

      
    Recipe.deleteOne({ title: "Carrot Cake" })
      .then((res) => {
        console.log('Deleted Cake', res);

      })

      .catch(() => {
        console.log('Error connecting to the database', error);
      })





      mongoose.disconnect();

