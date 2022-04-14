const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

const myRecipe = new Recipe({
  title: 'Classic and Simple Meat Lasagna',
  level: 'Easy Peasy',
  ingredients: [
    '12 whole wheat lasagna noodles',

    '1 pound lean ground beef',

    '2 cloves garlic, chopped',

    '½ teaspoon garlic powder',

    '1 teaspoon dried oregano, or to taste',

    'salt and ground black pepper to taste',

    '1 (16 ounce) package cottage cheese',

    '2 eggs',

    '½ cup shredded Parmesan cheese',

    '1 ½ (25 ounce) jars tomato-basil pasta sauce',

    '2 cups shredded mozzarella cheese',
  ],
  cuisine: 'Italian',
  dishType: 'main_course',
  image:
    'https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F43%2F2019%2F11%2F994958.jpg',
  duration: 60,
  creator: 'You are the Creator',
});
// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then((x) => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    // return Recipe.deleteMany();
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made
  })
  .catch((error) => {
    console.error('Error connecting to the database', error);
  });

// Recipe.create(myRecipe)
//   .then((recipe) => console.log('The user is saved and its value is: ', recipe))
//   .catch((error) =>
//     console.log('An error happened while saving a new user:', error)
//   );
// Recipe.insertMany(data)
//   .then((data) => console.log('The user is saved and its value is: ', data))
//   .catch((error) =>
//     console.log('An error happened while saving a new user:', error)
//   );
// Recipe.findOneAndUpdate(
//   { title: 'Rigatoni alla Genovese' },
//   { duration: 100 },
//   { new: true }
// )
//   .then((recipe) => console.log('success', recipe))
//   .catch((error) => console.log('an error happened', error));

// Recipe.deleteOne({ title: 'Carrot Cake' })
//   .then((recipe) => {
//     console.log('success', recipe);
//     mongoose.connection.close();
//   })
//   .catch((error) => console.log('an error happened', error));

// process.on('SIGINT', () => {
//   mongoose.connection.close(() => {
//     console.log(
//       'Mongoose default connection disconnected through app termination'
//     );
//     process.exit(0);
//   });
// });
