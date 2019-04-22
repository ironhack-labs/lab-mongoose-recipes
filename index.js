const mongoose = require('mongoose');
const Recipe = require('./models/Recipe'); 
const data = require('./data.js'); 

(async () => {
  
  mongoose
    .connect('mongodb://localhost/recipeApp', { useNewUrlParser: true })
    .then(() => {
      console.log('Connected to Mongo!');
    })
    .catch(err => {
      console.error('Error connecting to mongo', err);
    });

  
  await Recipe.create({
    title: 'Chilaquiles',
    level: 'Easy Peasy',
    ingredients: ['tortillas', 'queso', 'crema', 'salsa verde'],
    cuisine: 'mexican',
    dishType: 'Breakfast',
    image:
      'https://www.cocinavital.mx/wp-content/uploads/2017/11/chilaquiles-rojos-paso-a-paso.jpg',
    duration: 30,
    creator: 'Bren'
  })
    .then(doc => console.log(`New recipe: ${doc.title}`))
    .catch(err => console.log(`Error while inserting one`));

  
  await Recipe.insertMany(data)
    .then(docs => {
      docs.forEach(doc => console.log(`New recipe: ${doc.title}`));
    })
    .catch(err => console.log(`Error while inserting many`));

  
  await Recipe.findOneAndUpdate(
    { title: 'Rigatoni alla Genovese' },
    { duration: 100 }
  )
    .then(doc => console.log(`New duration: ${doc.duration}`))
    .catch(err => console.log(`Error while updating one`));

  
  await Recipe.deleteOne({ title: 'Carrot Cake' })
    .then(() => console.log(`Deleted one`))
    .catch(err => console.log(`Error while deleting one`));

  
  mongoose.connection.close();
})();