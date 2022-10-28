const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app"
 mongoose
   .connect(MONGODB_URI)
   .then(x => {
     console.log(`Connected to the database: "${x.connection.name}"`);
//     Before adding any recipes to the database, let's remove all existing ones
     return Recipe.deleteMany()
     
   })
   .then(() => {
    let result = Recipe.create({title: "Butter & bread", level: "Easy Peasy", ingredients: ["butter", "bread"], cuisine: "Mongolian", dishtype: "other", duration: 5, creator: "Giuliano" });
     return result
  })
  .then((changed)=>{
    console.log(changed)
  })
   .then(() => {
    let res = Recipe.insertMany(data);
      for(let i = 0; i < data.length; i++){
        console.log(data[i].title)
      }
      return res
   })
   .then(() => {
    let resu = Recipe.findOneAndUpdate({title:"Rigatoni alla Genovese"},{duration: 100});
    console.log("You did it!")
    return resu

   })
   .then(() => {
    let resul = Recipe.deleteOne({title: "Carrot Cake"})
    console.log("You did it!")
    return resul

   })

   mongoose.connection.close()

   .catch(error => {
   console.error('Error connecting to the database', error);
  });