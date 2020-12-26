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
    Recipe.create({title:'pizza', cuisine:'italian'})
    .then(recepie=>console.log (`The recepie: ${recepie.title} is saved`))
    .catch(error=>console.log('An error happened while saving recepie.', error))

    Recipe.insertMany(data)
    .then(data=>data.forEach(recepie=>console.log(recepie.title)))
    .catch(error=>console.log('An error happened while saving recepie.', error))

    setTimeout(() => {
      Recipe.findOneAndUpdate({ title: "Rigatoni alla Genovese" }, { duration: 100 }, { new: true },
      (error, data) => {
        if (error) {
          console.log(error);
        } else {
          console.log('Successfully updated', data);
        }
      }
    );
    }, 2000)
    

setTimeout(() => {
  Recipe.deleteOne({title:'Carrot Cake'})
  .then( 
    console.log(`Successfully deleted`)
  )
  .catch(error => {
    console.error('Error while deleting', error)
  });
}, 2500)

  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });


  

  process.on("SIGINT", () => {
    mongoose.connection.close(() => {
      console.log("Connection disconnected");
      process.exit(0);
    })
  })