const mongoose = require('mongoose');
const Recipe = require('./models/Recipe'); // Import of the model Recipe from './models/Recipe'
const data = require('./data.js');  // Import of the data from './data.js'

// Connection to the database "recipeApp"
mongoose.connect('mongodb://localhost:27017/recipeApp', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to Mongo!');
  }).catch(err => {
    console.error('Error connecting to mongo', err);
  });

  let recipe1 = {
      title: 'Italian Pizza',
      level: 'Amateur Chef',
      ingredients: ['Dough', 'Tomato Sauce', 'Cheese', 'Ham'],
      cuisine: 'Italian',
      dishType: 'Dish',
      image: 'https://images.media-allrecipes.com/userphotos/720x405/815964.jpg',
      duration: 35,
      creator: 'Chef LeRo',
  };
  
  Recipe.create( recipe1 )
      .then(result => console.log('Insertion Successful!', result))
      .catch(err => console.error(err))
    
   Recipe.insertMany(data)
      .then( (result) => {
        results.forEach(( resultObj) => console.log(`${resultObj.title}`))
      })
      .catch(err=> console.log(err))


   Recipe.findOneAndUpdate({ title: 'Rigatoni alla Genovese' }, { $set: { duration:  100 } })
      .then((result) => console.log('successfuly updated', result))
      .catch(err => console.log(err));
    
    
   Recipe.deleteOne({ title:'Carrot Cake'})
       .then( (result) => console.log('Success deleting document', result))
       .catch(err => console.log(err));


  process.on('SIGINT', () => {
      mongoose.connection.close(() => {
          console.log(
            'Mongoose default connection disconnected through app termination',
          );
          process.exit(0);
        });
      });