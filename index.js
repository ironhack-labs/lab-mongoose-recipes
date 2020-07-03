const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');
const { findOne } = require('./models/Recipe.model');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

const carbo = {
   title: 'Carbonara Pastas',
   level: 'Easy Peasy',
   ingredients: ['pasta', 'egg', 'cream', 'pepper', 'salt', 'ham'],
   cuisine: 'italian',
   dishType: 'main_course',
   duration: 10,
};

// Connection to the database "recipe-app"

mongoose
   .connect(MONGODB_URI, {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
   })

   .then((self) => {
      console.log(`Connected to the database: "${self.connection.name}"`);
      // Before adding any documents to the database, let's delete all previous entries
      return self.connection.dropDatabase();
   })

   // Run your code here, after you have insured that the connection was made

   .then(() => {
      Recipe.create(carbo)
         .then(() => {
            console.log('ITE 2 >> new recipe :', carbo.title);
         })
         .catch((err) => {
            console.log('ITE 2 >> ERROR DETECTED : ', err);
         });
   })

   .then(() => {
      Recipe.insertMany(data)
         .then((insertedRecipes) => {
            insertedRecipes.forEach((recipe) => {
               console.log('ITE 3 >> inserted recipe :', recipe.title);
            });
         })
         .catch((err) => {
            console.log('ITE 3 >> ERROR DETECTED : ', err);
         });
   })

   .then(() => {
      Recipe.updateOne(
         { title: 'Rigatoni alla Genovese' },
         { $set: { duration: 100 } }
      )
         .then((updatedData) => {
            console.log(
               'ITE 4 >> UPDATE SUCCESS, new duration : ',
               updatedData.duration //undefined >> why ?
            );
         })
         .catch((err) => {
            console.log('ITE 4 >> UPDATE FAILED', err);
         });
   })

   .then(() => {
      Recipe.findOneAndDelete({ title: 'Carrot Cake' })
         .then(() => {
            console.log('ITE 5 >> SUCCESS : delete Carrot Cake ');
         })
         .catch((err) => {
            console.log('ITE 5 >> ERROR : delete failed ', err);
         });
   })

   .then(() => {
      mongoose.connection.close();
      console.log('ITE 6 >>>>>Mongoose disconnected<<<<<');
   })

   .catch((error) => {
      console.error('Error connecting to the database', error);
   });
