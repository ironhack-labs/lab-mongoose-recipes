const mongoose = require('mongoose');
const Recipe = require('./models/Recipe.model');
const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

const data = require('./data');

mongoose
.connect(MONGODB_URI)
.then(x => {
  console.log(`Connected to the database: "${x.connection.name}"`)

 Recipe.create({
    "title": "Carbonara",
    "level": "Easy Peasy",
    "ingredients": [
      "2 pounds red onions, sliced salt to taste",
      "2 (16 ounce) boxes uncooked rigatoni",
    ],
    "cuisine": "Italian",
    "dishType": "main_course",
    "image": "https://images.media-allrecipes.com/userphotos/720x405/3489951.jpg",
  }).then((value) => console.log(value.title))
}).then(() => {
   Recipe.insertMany([...data])

})
  .then(() => {
   /*  console.log(allrecipes{title}) */
   
     Recipe.updateOne({title:'Rigatoni alla Genovese'}, {duration: 100})
     .then((title) => console.log(title))
  })
  .then(() => {
    return Recipe.deleteOne({title: 'Carrot Cake'})
  })
  /* .then(() =>{
    mongoose.connection.close()
  }) */
  .catch(error => {
    console.error('Error connecting to the database', error);
  });

 