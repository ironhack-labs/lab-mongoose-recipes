const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');
const { create } = require('./models/Recipe.model');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then(x => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made
    Recipe.create({
      title: "Hot cakes",
      level: "Easy Peasy",
      ingredients: ["lechita", "masa para hot cakes", "huevo", "mantequilla"],
      cuisine: "Mex",
      dishType: "breakfast",
      Image: "https://casahotnuts.com/postres/origen-hot-cakes/",
      duration: "15",
      creator: "aunt jemima",
      created: "",
   })
   .then(recipe =>  
    console.log(recipe))
   .catch(err =>
    console.log("ERROR!"))
  
   Recipe.insertMany(data)
    .then(console.log("Data add"))
    .catch(error => console.log('error creating recipe', error))
    
    Recipe.find({}, {title: 1})
    .then(console.log)
    .catch((err) => console.log(err))

    Recipe.updateOne({title: "Rigatoni alla Genovese"}, {duration: 100})
    .then( recipe => console.log("create"))
    .catch((err) => console.log(err))

    
    Recipe.find({}, {title: 1, _id: 0})
    .then(console.log)
    .catch((err) => console.log(err))

    Recipe.deleteOne({title: "Carrot Cake"})
    .then( recipe => {
      console.log("delete")
      mongoose.connection.close(() => {
        console.log('disconnect')
        process.exit(0)
        })
    })
    .catch((err) => console.log(err))
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });


