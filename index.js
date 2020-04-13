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

    // console.log(data);

    // Iteration 2
    Recipe.create({title: 'Arroz Doce'})
    .then(recipe =>{
        console.log(`The recipe was saved ${recipe.title}`);
    })
    .catch(error => {
        console.log(`An error occurred: ${error}`);
    });


    //Iteration 3
    Recipe.insertMany(data)
      .then(recipes =>{
        console.log(`All recipes inserted.`);
      
        Recipe.find({}, 'title')
        .then(titles =>{
          console.log(`Recipe title: ${titles}`);
        })
        .catch(err =>{
          console.log(`An error has occurred ${err}`);
        });

        //Iteration 4
        Recipe.findOneAndUpdate({ title: 'Rigatoni alla Genovese' }, { duration: 100 })
        .then(recipe => {
          console.log(`Recipe successfuly updated: ${recipe}`);
        })
        .catch(err =>{
          console.log(`An error has occurred ${err}`);
        });

        //Iteration 5
        Recipe.deleteOne({ title: 'Carrot Cake'})
          .then(recipe =>{
            console.log(`Recipe deleted!`);

            mongoose.connection.close(() => {
              console.log('Mongoose default connection disconnected through app termination');
            });
          })
          .catch(err =>{
            console.log(`An error has occurred: ${err}`);
          });

        })
        .catch(err =>{
          console.log(`An error has occurred: ${err}`);
        });
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });
