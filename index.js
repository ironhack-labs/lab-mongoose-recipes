const mongoose = require('mongoose');
const Recipe = require('./models/Recipe'); // Import of the model Recipe from './models/Recipe'
const data = require('./data.js'); // Import of the data from './data.js'

// Connection to the database "recipeApp"
mongoose.connect('mongodb://localhost/recipeApp', { useNewUrlParser: true })
  .then(() => {
    console.log('Connected to Mongo!');
  }).catch((err) => {
    console.error('Error connecting to mongo', err);
  });


Recipe.create({
  title: 'Meatballs',
  level: 'Amateur Chef',
  ingredients: ['1 pound ground beef', '1/2 pound ground veal', '1/2 pound ground pork', '2 cloves garlic, minced', '2 eggs', '1 1/2 tablespoons chopped Italian flat leaf parsley'],
  cuisine: 'Italian',
  dishType: 'Dish',
  image: 'https://www.google.com/url?sa=i&source=images&cd=&ved=2ahUKEwj5rPqpmI3kAhU7J7kGHV0PC00QjRx6BAgBEAQ&url=https%3A%2F%2Fwww.bettycrocker.com%2Frecipes%2Feasy-meatballs%2F2959910f-1b27-438a-9085-d40b1950db20&psig=AOvVaw3saDqQa4XnInyChr2PwuhE&ust=1566244163272111',
  duration: 50,
  creator: 'Nadia Nami Abe',
})
  .then((recipe) => { console.log('Recipe created successfully: ', recipe); })
  .catch((err) => { console.log('An error happened:', err); });

Recipe
  .insertMany(data, (error, dccs) => {
    data.forEach((item) => {
      console.log(`${item.title}`);
    });
  });


Recipe
  .updateOne({ title: 'Rigatoni alla Genovese' }, { duration: 100 })
  .then((success) => { console.log('Change made successfully', success) ;})
  .catch((error) => { console.log('Change failed'), error; });

Recipe
  .deleteOne({ title: 'Carrot Cake' })
  .then((success) => {
    console.log('Item deleted successfully', success);
  })
  .catch((error) => { console.log('Unable to delete', error); });


process.on('SIGINT', () => {
  mongoose.connection.close(() => {
    console.log('Mongoose disconnected');
    process.exit(0);
  });
});

