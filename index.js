const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then(x => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    //return Recipe.deleteMany()
  })
  .then(() => {
  
/*    
    //Iteration 2: 
      Recipe.create(
      { title:       'Eggs',
        level:       'Easy Peasy',
        ingredients: ['eggs','salt','pepper'],
        cuisine:     'eggy',
        dishType:    'breakfast',
        duration:    5,
        creator:     'Me'})
      .then((created) => console.log(created.title))
      .catch(err => console.log('Create failed', err));
  
    //Iteration 3:
        Recipe.insertMany(data)
        .then((created)=>created.forEach(ins=>console.log(ins.title)))
        .catch(err => console.log('Create failed', err));        

    //Iteration 4:
      Recipe.findOneAndUpdate(
          { title: "Rigatoni alla Genovese"},
          { $set:  {duration: 100 } } )
        .then(()=>console.log('Successfully updated'))
        .catch(err => console.log('Update failed', err));     

    //Iteration 5:
        Recipe.deleteOne( { title: "Carrot Cake"} )
          .then(()=>console.log('Successsfully removed'))
          .catch(err => console.log('Delete failed', err));          
*/
    // Run your code here, after you have insured that the connection was made
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });


  mongoose.connection.close(()=>console.log('DB Connection Closed'));