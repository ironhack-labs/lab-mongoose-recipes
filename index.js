const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

const executeRoutines = async () => {
  
  try {
    await mongoose.connect(MONGODB_URI, {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true
    })

    await mongoose.connection.dropDatabase();


    const createRecipes = await Recipe.insertMany(data);      
  
    createRecipes.forEach(recipe => {
      console.log(recipe.title)
    })

    await Recipe.updateOne( { title: 'Rigatoni alla Genovese' }, { duration: 100 });
    console.log('Rigatoni recipe updated');

    await Recipe.deleteOne( { title: 'Carrot Cake' });
    console.log('Carrot Cake deleted');

  } catch (error) {
    console.log('executeRoutines error: ====> ', error);
  } finally {
    mongoose.connection.close()
  }
  
}

executeRoutines();

//With promises:

// mongoose
//   .connect(MONGODB_URI, {
//     useCreateIndex: true,
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     useFindAndModify: false
//   })
//   .then(self => {
//     console.log(`Connected to the database: "${self.connection.name}"`);
//     // Before adding any documents to the database, let's delete all previous entries
//     return self.connection.dropDatabase();
//   })
//   .then(() => {
//     // Run your code here, after you have insured that the connection was made
//     Recipe.insertMany(data)
//       .then(recipes => {
//         recipes.forEach(recipe => console.log(recipe.title))
//           Recipe.updateOne({ title: 'Rigatoni alla Genovese' }, { duration: 100 })
//           .then(() => {
//               console.log('Rigatoni recipe successfully updated')
//               Recipe.deleteOne({ title: 'Carrot Cake'})
//               .then(() => {

//                 console.log('Carrot cake successfully deleted')

//                 mongoose.connection.close()
//               })

//             })               
            
//       })

//   })
//   .catch(error => {
//     console.error('Error connecting to the database', error);
//   });