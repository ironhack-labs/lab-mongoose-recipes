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
    useFindAndModify: true
  }).then(self => {
    console.log(`Connected to the database: "${self.connection.name}"`);
    // Before adding any documents to the database, let's delete all previous entries
    return self.connection.dropDatabase();
  })
  .then((self) => {
    // Run your code here, after you have insured that the connection was made
    /* CREATE TEST */
    Recipe.create({
        title: 'Test'
    })
    .then((recipe) => {
      console.log('CREATE A TEST RECIPE');
      console.log(recipe.title);
      console.log('----------------------------');
    }).then(() => {

      Recipe.find().then(res => {
        console.log('----- CONTROL NUMBERS OF RECIPE -------');
        console.log(res.length);
        console.log('------------');

        Recipe.insertMany(data, (err, recipes) => {
          //console.log(recipes);
          console.log('------ INSERT MANY RECIPES ------');
          recipes.forEach((recipe) => {
            console.log(recipe.title, recipe.duration);
            console.log('------------');
          });
          Recipe.find().then(res => {
            console.log('----- CONTROL NUMBERS OF RECIPE -------');
            console.log(res.length);
            console.log('------------');

            Recipe.findOne({title: 'Rigatoni alla Genovese'})
            .then(res => {
              console.log('----- before One And Update -----');
              console.log( res.title, res.duration );

              Recipe.findOneAndUpdate({title: 'Rigatoni alla Genovese'}, { duration: 100}, {new: true})
              .then((res) => {
                console.log('------ FIND ONE AND UPDATE ------');
                console.log(res.title, res.duration);
                console.log('------------');

                Recipe.deleteOne({title: "Carrot Cake"},{new: true, useFindAndModify: true}, (err) => {} )
                .then(res => {
                  console.log('------ DELETE ONE ------');
                  console.log(res);
                  console.log('------------');

                  Recipe.find().then(res => {
                    console.log('----- CONTROL NUMBERS OF RECIPE AFTER DELETE ONE -------');
                    console.log(res.length);
                    console.log('------------');

                    Recipe.findOne({title: "Carrot Cake"})
                    .then(res => {
                      console.log('----- TRY TO FIND "Carrot Cake" -------');
                      console.log(res);

                      console.log('----- CLOSE CONNECT -------');
                      mongoose.connection.close();
                      console.log(mongoose.connection);
                    });
                  });
                });
              });
            });
          });
        });
      });
    });  
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });
