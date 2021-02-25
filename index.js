const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

const carbonara =
  {
  title: "Carbonara",
  level: "Easy Peasy",
  ingredients: ["luigine","pecorino","parmeggiano", "eggs", "guanciale"],
  cuisine: "italian",
  dishType: "main_course",
  }


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
    Recipe.create(carbonara)
      .then( carbonara => console.log('The recipe is: ', carbonara.title))
      .catch(error => console.log('An error happened while saving a new user:', error))

      .then(() => {
        Recipe.insertMany(data)
          .then(data => data.forEach(recipe => console.log('The recipe is: ', recipe.title)))
          .catch(error => console.log('An error happened while saving a new user:', error))
          
          .then(() => {
            Recipe.findOneAndUpdate({ title: "Rigatoni alla Genovese" }, { $set: { duration: 100 } }, { new: true } )
              //duration changed on the database but not in the console. Why?
              .then(recipe => console.log("New duration updated", recipe.duration)) 
              .catch(error => console.log("Update Failed", error))

              .then(() => {
                Recipe.deleteOne({ title: "Carrot Cake" })
                  .then(console.log("The Carrot Cake is deleted"))
                  .catch(error => console.log("Update Failed", error))

                  // Not sure about this one, I don't if the database is still on
                  .then(() => {
                    mongoose.connection.close(() => {
                      console.log("Mongoose disconnected")
                    })
                  })
                  
                  // This one seems to work when I quit nodemon (^C)
                  // .then(() => {
                  //   process.on('SIGINT', () => {
                  //     mongoose.connection.close(() => {
                  //       console.log('Mongoose is disconnected');
                  //       process.exit(0);
                  //     });
                  //   });
                  // })
              })
          })
      })
  })
  
  .catch(error => {
    console.error('Error connecting to the database', error);
  });
