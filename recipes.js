const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const data = require('./data.js');

mongoose.connect('mongodb://localhost/recipeApp')
  .then(() => {
    console.log('Connected to Mongo!');
  }).catch(err => {
    console.error('Error connecting to mongo', err);
  });
  const recipeSchema = new Schema({ 
    title: String,
    level: String,
    ingredients: {
      type: Array
    },
    cuisine: String,
    dishType: String,
    image: {
      type: String,
      default: 'https://images.media-allrecipes.com/images/75131.jpg'
    },
    duration: {
      type: Number,
      min: 0
    }, 
    creator: String,
    created: {
      type: Date,
      default: Date.now
    }
   });

   const Recipe = mongoose.model('Recipe', recipeSchema)

  

  //  function saveRecipe(){ 
  //  const nikosMeatballs = new Recipe({title:'meatballs'})
  //  //nikosMeatballs.save() as simple as this or ... 
  //  nikosMeatballs.save( result => { //using a promise
   
  //  })
  // }

  
    Recipe.insertMany(data).then(Recipe=>{
      for (Recipe of Recipes){
        console.log(Recipe.title)
      }
    })
   
    
   
   
    Recipe.updateOne({ title: 'Rigatoni alla Genovese'},{ duration: '100' } ).then(resute=>{
      console.log('this update?')
    })

    Recipe.deleteMany({ title: 'Carrot Cake'}).then(resute=>{
      console.log('this update2')
    })





    mongoose.connection.on('disconnected', () => {
      console.log('Mongoose default connection disconnected');
    });
    
    process.on('SIGINT', () => {
      mongoose.connection.close(() => {
        console.log(
          'Mongoose default connection disconnected through app termination'
        );
        process.exit(0);
      });
    });
  

 


