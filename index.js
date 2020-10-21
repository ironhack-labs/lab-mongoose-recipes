const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost/recipe-app';
// const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

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
    // return self.connection.dropDatabase();
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made
    mongoose.connection.on('disconnected', () => console.log('Mongoose default connection disconnected'));

    process.on('SIGINT', () => {
      mongoose.connection.close(() => {
        console.log('Mongoose default connection disconnected through app termination');
        process.exit(0);
      });
    });
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });


// (async () => {
//   try {
//     const recipe = await Recipe.create({
//       title: 'Bread with jam', 
//       level: 'Easy Peasy',
//       ingredients: ['Bread', 'Jam'],
//       cuisine: 'European',
//       dishType: 'breakfast',
//       image: 'https://images.media-allrecipes.com/images/75131.jpg',
//       duration: 5,
//       creator: 'Chef Alex Ollé',
//       created: Date.now,
//     });
//     console.log(`This recipe was saved ${recipe.title}`)
//   } catch (error) {
//     console.log(error.message);
//   }
// })();


// (async () => {
//   try {
//     const recipes = await Recipe.insertMany(data);
//     recipes.forEach( (element) => {
//       console.log(element.title);
//     })
//   } catch (error) {
//     console.log(error.message);
//   }
// })();

// (async () => {
//   try {
//       const recipe = await Recipe.findOneAndUpdate(
//           { title: 'Rigatoni alla Genovese' },
//           { duration: 100 },
//           { new: true } //para actualizar el documento en la consola, si no está, solo se actualiza en la DB pero no se muestra ni actualiza en la variable
//       );
//       console.log(recipe)
//       return recipe;
//   } catch (error) {
//       console.log(error.message)
//   }
// })();

// (async () => {
//   try {
//       const deleted = await Recipe.deleteOne(
//           { title: 'Carrot Cake' },
//       );
//       console.log(deleted)
//   } catch (error) {
//       console.log(error.message)
//   }
// })();
