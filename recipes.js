const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const data = require('./data.js')

mongoose.connect('mongodb://localhost/recipeApp')
  .then(() => {
    console.log('Connected to Mongo!')
  }).catch(err => {
    console.error('Error connecting to mongo', err)
  });


  
  
  const recipeSchema = new Schema ({
    title: {
      type: String,
      required: true
    },
    level: {
      type: String,
      enum: ['Easy Peasy', 'Amateur Chef', 'UltraPro Chef'],
    },
    ingredient: Array, 
    cousine: {
      type: String,
      required: true,
    },
    dishType: {
      type: String,
      enum: ['Breakfast', 'Dish','Snack','Drink','Dessert','Other'],
    },
    image: {
      type: String,
      default: 'https://images.media-allrecipes.com/images/75131.jpg',
    },
    duration: {
      type: Number,
      min: 0,
    },
    creator: String,
    create: {
      type: Date,
      default: Date.now,
    }
    
  })
    // We create a document in the database "recipe"
  
  const Recipe = mongoose.model("Recipe", recipeSchema);
  
  // Each time we run the app, this will create a field in the database. Create a field in the recipe database. In brackets the schema.
    // Recipe.insertMany(data)
    // .then (recipeDoc =>{
    // console.log("Create SUCCESSS", recipeDoc);
    // })
    // .catch (err => {
    // console.log("Create FAILURE!!", err);
    // });

    // Recipe.findOneAndUpdate(
    //     {title: {$eq: "Rigatoni alla Genovese"}}, 
    //     { $set: {duration: 100}})
    //   .then(catDoc => {
    //   console.log(`${catDoc.title} -> TROUVE & CHANGE `);
    //   })
    //   .catch(err => {   // the err allows us to know what the error is otherwise we'd just see the console log.
    //     console.log("FAILURE!!", err);
    //   });


  
// Recipe.find()
//   .then(recipeResults => {
//   recipeResults.forEach(oneRecipe => console.log(`${oneRecipe.title} (id : ${oneRecipe._id})`))
//   })
//   .catch(err => console.log("Recipe .find() FAILURE", err));


  Recipe.findOneAndRemove({title: {$eq: "Carrot Cake"}})
  .then(catDoc => {
  console.log(`${catDoc.title} -> TROUVE & SUPPRIME`);
  })
  .catch(err => {   // the err allows us to know what the error is otherwise we'd just see the console log.
    console.log("FAILURE!!", err);
  });