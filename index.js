const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');
const { db } = require('./models/Recipe.model');

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
    const madeUpRecipe = {
      title: "Ceviche",
      level: "Easy Peasy",
      ingredients: [
        "Fish",
        "Lemon",
        "Onions",
        "Parsley",
        "A couple spoons of salt",
        "Fist Stock",
        "Red Pepper"
      ],
      cuisine: "Peruvian",
      dishType: "main_course",
      image: "https://www.thespruceeats.com/thmb/4hiFhzfzR7mG275rp6prJv2dj84=/960x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/ceviche-fresco-845267908-5abd993b642dca0036ec8b3b.jpg",
      duration: 35,
      creator: "Gonzalo Loza",
      created: 2020-11-22,
    };

    // ITERATION 2
    
    /*
    Recipe.create(madeUpRecipe)
    .then(recipe => {
      console.log(recipe.title)
    })
    .catch(err => {
      console.log(`Everything failed in the following error ${err}`)
    });
    */

    // ITERATION 3

/*
    Recipe.insertMany(data, (error, docs) => {})
*/ 

    // ITERATION 4

    Recipe.findOneAndUpdate({title:"Rigatoni alla Genovese"}, {$set: {duration: 100}}, {new: true}, (err, doc) => {
      if (err) {
        console.log("error", err);
        return;
      };
      console.log("Success", doc)
    })

    //ITERATION 5




    //ITERATION 6
    db.close()
      .then(success => console.log(`The database has been closed: ${success}`))
      .catch(err => console.log(`Problems closing the database: ${err}`))

  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });
