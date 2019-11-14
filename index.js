const mongoose = require('mongoose');
const Recipe = require('./models/Recipe'); // Import of the model Recipe from './models/Recipe'
const data = require('./data.js');  // Import of the data from './data.js'

// Connection to the database "recipeApp"
mongoose.connect('mongodb://localhost/recipeApp', { useNewUrlParser: true })
  .then(() => {
    console.log('Connected to Mongo!');
  }).catch(err => {
    console.error('Error connecting to mongo', err);
  });


  
  
  // Iteration 2 - Create a recipe

      
      let recipe1 = {
          title: 'spanish omelette',
          level: 'Easy Peasy',
          ingredients: ['eggs', 'oil', 'potatos'],
          cuisine: 'European',
          dishType: 'Dish',
          image: 'https://images.media-allrecipes.com/userphotos/720x405/815964.jpg',
          duration: 15,
          creator: 'Casa Pepe'
        }


      Recipe.create( recipe1 , (err, result) => {
        if (err) console.log(err);
        else console.log('Document inserted', result);
      }); 


  //  Iteration 3 - Insert Many recipes


        
        Recipe.insertMany(data)
          .then( (result) => console.log(result))
          .catch(err=> console.log(err))
        
      
        


   // Iteration 4 - Update recipe

   
      
    Recipe.findOneAndUpdate({ title: 'Rigatoni alla Genovese' }, { $set: { duration: 100 } })
      .then((result) => console.log('duration successfuly updated', result))
      .catch(err => console.log(err));
      

     
      
    // Iteration 5 - Remove a recipe

      Recipe.deleteOne({ title: 'Carrot Cake'})
        .then(( result) => console.log('recipe deleted succesfully',result))
        .catch(err => console.log(err));
        
    

         //  Checking if changes are made in BBDD 
      
      Recipe.find()
      .then( (result) => console.log(result))
      .catch(err=> console.log(err)); 
      



    // Iteration 6 - Close the Database

    mongoose.connection.close()
    .then(() => {
      console.log('disConnected to Mongo!');
    }).catch(err => {
      console.error('Error disconnecting to mongo', err);
    });