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
    //one foood
    Recipe.create({
      title: "food1"
    }).then(console.log("food created"))
    // Recipe.find({ title: "food" }).then(foods => console.log(foods))//here this doesnt work

    //foods fromo data.jsoon
    Recipe.create(data)
      .then(user => console.log('The dats is saved  '))
      .catch(error => console.log('An error happened while :', error));

    //Iteration 3 - Insert multiple recipes
    const arr = [{
        title: 'pie'
      },
      {
        title: 'burger'
      },
      {
        title: 'beef'
      },
      {
        title: 'watter bolillo'
      },
      {
        title: 'steack'
      },
      {
        title: 'soup'
      }
    ];

    Recipe.insertMany(arr, function(error, docs) {});
    //Iteration 4 - Update recipe
    (async () => {
      try {
        const update = await Recipe.findOneAndUpdate({
          title: "Rigatoni alla Genovese"
        }, {
          duration: 100
        }, {
          useFindAndModify: false
        });
      } catch (error) {
        console.log(error.message);
      }
    })();


  }).then(() => {

    return Recipe.deleteOne({ title: "Carrot Cake" });

  })

  // .then(() => {
  //
  //    mongoose.connection.close(() => {
  //       console.log("Mongoose default connection disconnected through app termination");
  //       process.exit(0);
  //     });
  //
  // })

  .catch(error => {
    console.error('Error connecting to the database', error);
  });

// Recipe.find({ title: "Rigatoni alla Genovese" }).then(foods => console.log(foods))//one foo
// Recipe.find().then(foods => console.log(foods)) //all foods
