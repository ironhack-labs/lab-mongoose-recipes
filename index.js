const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data.json');

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
    // Run your code here, after you have insured that the connection was made
      const newRecipe = {
        title: 'Overnight Oats',
        level: 'Easy Peasy',
        ingredients: ['oats','milk','honey'],
        cuisine: "Universal",
        dishType: 'dessert',
        image: 'http://placekitten.com/50/50',
        duration: 5,
        creator: 'healthymum222',
      }

  Recipe.create(newRecipe).then(() => {
        console.log(newRecipe.title);
      }).catch((err) => {
        console.log(err)
      });
 
  Recipe.insertMany(data).then(() => {
       /*  data.forEach(()=>{
          //console.log(newRecipe.title)
        }) */
        Recipe.findOneAndUpdate({title:"Rigatoni alla Genovese"},{duration:100}).then((newRecipe) => {
          console.log('Update Successful')
        }).catch((err)=>{
          console.log(err)
        })

        Recipe.deleteOne({title:"Carrot Cake"}).then(() => {
          console.log('Remove Successful')
        }).catch((err)=>{
          console.log(err)
        })
  })
}) 

 mongoose.connection.close().then(() => {
  console.log('Connection Closed')
}) 

.catch(error => {
  console.error('Error connecting to the database', error);
}); 

 