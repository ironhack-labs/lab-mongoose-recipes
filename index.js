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
    return self.connection.dropDatabase();
  })
  .then(() => {
    Recipe.create({
      title: 'Fried Egg', 
      level:'Easy Peasy', 
      Ingredients:['eggs', 'herbs'], 
      cuisine: 'traditional',
       dishType: 'breakfast', 
       image:'https://tse4.mm.bing.net/th?id=OIP.UG6pKGyoHB_SDKneZ2sQeAHaFj&pid=Api&P=0&w=218&h=164', 
       duration: 5, 
       creator:"Paula",  
      })
      .then((recipe) => console.log("Created:", recipe.title))
      .then(() => {
        Recipe.insertMany(data)
        .then(() =>{
          data.forEach((recipe) => {
            console.log('Added:', recipe.title);
          });
          Recipe.findOneAndUpdate( { title: "Rigatoni alla Genovese" }, {duration:100})
          .then(() => {
            console.log(`Perfect, you updated the duration of 'Rigatoni alla Genovese'`);
          })

          Recipe.deleteOne({title: "Carrot Cake"})
          .then(()=> {
            console.log("You were able to delete the Carrot Cake Recipe");
          })
          .then(() => {
            mongoose.connection.close(()=> {
              console.log("You are now disconnected");
            });
          })


        })
       
      });  
 // Run your code here, after you have insured that the connection was made
  })
  
  .catch(error => {
    console.error('Error connecting to the database', error);
  });
