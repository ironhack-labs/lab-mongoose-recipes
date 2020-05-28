const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';



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
    
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made
      Recipe.create({name: 'Recipe'})
      .then((res)=>{
        console.log('Successfully Created: ', res)
      })

      Recipe.insertMany(data)
      .then((res)=>{
        console.log('Successfully Added: ', res)
      })

      Recipe.deleteOne({title:'Carrot Cake'})
      .then((res)=>{
        console.log('Successfully Deleted: ', res)
      })

      Recipe.updateOne({title:'Rigatoni alla Genovese'}, {$set: {duration: 100}})
      .then((res)=>{
        console.log('Successfully Updated: ', res)
      })
      
      })
    
  .catch(error => {
    console.error('Error connecting to the database', error);
    mongoose.disconnect()
  });
  

  

  

  
