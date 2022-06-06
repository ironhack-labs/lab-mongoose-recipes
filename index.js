const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
//recipe es mi modelo.
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then(x => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    //return Recipe.deleteMany() 
  })
   /* .then(() => {

    let lomoSaltado = {
      "title": "Lomo saltado",
      "level": "Amateur Chef",
      "ingredients": [
        "200gr of meat",
        "2 tablespoons vinegar",
        "3 tomatoes",
        "2 onions",
        "2 tablespoons of soya sauce"
        
      ],
      "cuisine": "peruvian",
      "dishType": "main_course",
      "image": "https://images.media-allrecipes.com/userphotos/720x405/815964.jpg",
      "duration": 15,
      "creator": "Chef LePupu"
    }

    return Recipe.create(lomoSaltado)
  })
  .then((newRecipe) => {console.log(newRecipe.title)}) 
  .then(()=> {
    return Recipe.insertMany(data)
  })
  .then((arrayRecipe)=>{

    arrayRecipe.forEach(element => {
      console.log(element.title)
    })
  }) */

  .catch(error => {
    console.error('Error connecting to the database', error);
  });


  Recipe.findOneAndUpdate({title:"Rigatoni alla Genovese"},{
    duration:100},{new:true})
  .then(() => {console.log("sucessUpdate")})
  .catch(error => {
    console.error('Error connecting to the database', error);
  });

  Recipe.deleteOne({title:"Carrot Cake"})
  .then(() => {console.log("sucessDelete")})
  .then(()=>{
    mongoose.connection.close() //remember the "Pay attention to the asynchronicity of the operation" so we need a promise to be executed first to go inside the moongose.connection.close
    console.log("databaseClosed")
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });


  


