const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://0.0.0.0:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then(x => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })
  .then(() => {
    Recipe.create({
      title: "guacamole",
      level: "Easy",
      ingredients: ["avocado", "oignons", "citron"],
      cuisine: "mexicano",
      dishType: "entrée",
      image: "https://www.simplyrecipes.com/thmb/7SLGIKmCSMifkxT9WuGAc3Ozg-4=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/__opt__aboutcom__coeus__resources__content_migration__simply_recipes__uploads__2018__07__Guacamole-LEAD-1-47de4e6e47464daba88a7f42155a2af3.jpg",
      duration: 13,
      creator: "Jose",
      created: 04 / 12 / 2000,
    })
      .then((recipeFromDB) => console.log("titre=", recipeFromDB.title))
    // Run your code here, after you have insured that the connection was made
  })
  .then(function () { Recipe.insertMany(data) })

  .then(function (dataFromDB) {
    data.forEach(element => {
      console.log("title=", element.title)
    });
  })
  .then(function(){
    Recipe.findOneAndUpdate({ title: "Rigatoni alla Genovese" }, { duration: 100 })
    .then(()=>console.log("update OOK"))
    .catch((err)=>console.log(err));
  })
  .then((dataFromDB) => {
    return Recipe.deleteOne({ title: "Carrot Cake" });
  })
  .catch(error => {
    console.error('Error', error);
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });


console.log(data);

/*
Recipe.findOneAndUpdate({ title: "Rigatoni alla Genovese" }, { duration: 100 });

Recipe.create(data)
.then(function (dataFromDB) {
  console.log("all books created !!")
})
.catch(function (err) { console.log(err) })


Recipe.find()
.then(function(dataFromDB){
  console.log("all data", dataFromDB)
  console.log("title: ", dataFromDB.title)
})
.catch(function(err){err})

*/