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
    //ADD ONE RECIPE 
    Recipe.create({title : "Fondant au Chocolat",level : "Easy Peasy", cuisine : "Bonne"})

    //ADD MULTIPLE
    Recipe.insertMany(data)
      .then((res)=>{
        //PRINT THE TITLE
        res.forEach(recipe => console.log(recipe.title, ' has been successfully added.'))
        //UPDATE THE RECIPE
        Recipe.updateOne({title: "Rigatoni alla Genovese"},{$set : {duration:100}})
          .then(() => {
            //DELETE THE RECIPE
            Recipe.deleteOne({title : "Carrot Cake"})
            .then(()=>{
              mongoose.connection.close()
            })
          })
      })
  })
  
  .catch(error => {
    console.error('Error connecting to the database', error);
  });
