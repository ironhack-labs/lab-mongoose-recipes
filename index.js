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
    useUnifiedTopology: true,
    useFindAndModify: false

  })
  .then(self => {
    console.log(`Connected to the database: "${self.connection.name}"`);
    // Before adding any documents to the database, let's delete all previous entries
    return self.connection.dropDatabase();
  })
  .then(() => {


    //Create One
    Recipe.create(data[0])
  .then((data)=>{
    console.log(`Recipe name: ${data.title} `)
    })
    .catch((error)=>{
    console.log(error)
    })


   //Create Many

    Recipe.insertMany(data)
    .then((result)=>{
      result.forEach((result) => console.log(result.title))
    })
  .catch((error)=>{
      console.log(error)
    })

  //Update Recipe
  Recipe.findOneAndUpdate({title: "Rigatoni alla Genovese"}, {duration: 100})
  .then((result)=>{
    console.log(`Your new duration is: ${result.duration}`)
  })
  .catch((error)=>{
    console.log(error)
  })

//Remove a Recipe

Recipe.deleteOne({title: "Carrot Cake"})
.then((result) => {
  console.log(`The recipe ${result.title} has been removed!`)
})
.catch((error)=>{
  console.log(error)
})
    // Run your code here, after you have insured that the connection was made
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });

  mongoose.connection.close()
