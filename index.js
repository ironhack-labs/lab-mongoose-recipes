const mongoose = require('mongoose');
const Recipe = require('./models/Recipe'); // Import of the model Recipe from './models/Recipe'
const data = require('./data.js');  // Import of the data from './data.js'
mongoose.set('useCreateIndex', true);

// Connection to the database "recipeApp"
mongoose.connect('mongodb://localhost/recipeApp', { useNewUrlParser: true })
  .then(() => {
    console.log('Connected to Mongo!');
  }).catch(err => {
    console.error('Error connecting to mongo', err);
  });

  /* Recipe.create({  
      title: 'Bigos',       
      level: 'UltraPro Chef', 
      ingredients: ['Sauerkraut', 'Cabbanosi','Fleisch', 'Tomaten', 'Salz', 'Pfeffer', 'Rotwein'],
      cuisine: 'Polish',
      dishType: 'Dish', 
      //image: '', 
      duration: 4,  
      creator: '',
    //created:   
  
  })
    .then(doc => {
      console.log(`Created recipe: ${doc.title}`);
  }).catch(err => {
      console.log(`Error at creating recipe ${err}`);
  }); */

/* console.log(data)  
  Recipe.insertMany(data)  
  .then(doc => {
    doc.forEach(e => console.log(e.title))
    //console.log(`inserted recipes: ${doc.title}`);
}).catch(err => {
    console.log(`Error at inserting recipes ${err}`);
}); */



/* Recipe.updateOne({title: 'Rigatoni alla Genovese'}, {duration: 100})  
  .then(doc => {
    console.log(`update duration successful`);    
}).catch(err => {
    console.log(`Error in update ${err}`);
}); */
  
Recipe.deleteOne({title: 'Bigos'})  
  .then(doc => {
    console.log(`delete was successful`);    
  })
  .catch(err => {
    console.log(`Error in delete ${err}`);
  })
  .finally(() => {
    mongoose.connection.close()
  });

