const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');
const { update } = require('./models/Recipe.model');

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
    Recipe.create([
      { title: 'Derf Burger', level: "Amateur Chef", ingredients: ["Beef","Pork","Ketchup","Salt","Pepper","Onion"], cuisine:"Canadian", dishType:"main_course", duration:20, creator:"Fred" }
    ])
      .then(myRecipe => {console.log(`Recipe created: `, myRecipe.title)
    }
    );

    Recipe.insertMany(data)
      .then(newRecipes => console.log("Recipe created: ", newRecipes.title))
      .catch((error =>
        console.log(`Creating a new recipe went wrong! Try again 😞 ${error}`)))
      
      .then(()=>{
        //Model.findOneAndUpdate(query, { name: 'jason bourne' }, options, callback)
        Recipe.findOneAndUpdate({ title: 'Rigatoni alla Genovese' }, { $set: {duration: 100 }}, {new:true})
        .then((updatedRecipe) => console.log(`Rigatoni Updated: ${updatedRecipe}`))
        .catch((error => console.log(`updatedRecipe failed ${error}`)))
      })
      .then(()=>{
        //Model.deleteOne({ name: 'Edward Stark' }, function (err) {});
        Recipe.deleteOne({title:'Carrot Cake'})
        .then((() => console.log(`Carrot Cake Deleted`)))
        .catch((error => console.log(`error deleting Carrot Cake; ${error}`)))
      })
  })
  
  .catch(error => {
    console.error('Error connecting to the database', error);
  });

