const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const data = require('./data.js')

mongoose.connect('mongodb://localhost/recipeApp')
  .then(() => {
    console.log('Connected to Mongo!')
  }).catch(err => {
    console.error('Error connecting to mongo', err)
  });

  const recipeSchema = new Schema({
    title : String,
    level : {type: String, enum:["Easy Peasy", "Amateur Chef", "UltraPro Chef" ]},
    ingredients  : [],
    cousine :  {type: String, required:true},
    dishType : {type: String, enum: ["Breakfast", "Dish", "Snack", "Drink", "Dessert", "Other"]},
    image : {type: String, default: "https://images.media-allrecipes.com/images/75131.jpg."},
    duration  : {type: Number, min: 0},
    creator : String,
    created : {type: Date, default: Date.now}

  })

  const Recipe = mongoose.model('Recipe', recipeSchema);

  Recipe.create({
    title: 'Bourbon Glazed Pork Chop',
    level: 'Amateur Chef',
    ingredients: ['1/2 cup vinegar', '5 tablespoons honey', '1/3 cup broth (such as Silver Swan®)', '1/4 cup Bourbon', '3 tablespoons garlic powder', '3 tablespoons minced garlic', 'salt and pepper to taste', '8 grass fed pork chops'],
    cousine: 'American',
    dishType: ['Dish'],
    image: '',
    duration: 40,
    creator: 'Chef Otton'
  })
  .then((response)=> { console.log(response.title)})
  .catch((err)=> { console.log(err) })

  Recipe.insertMany(data, function(err, response){
    if (err) console.log("error: ", err);
    else console.log(response); 
  });

  Recipe.find({})
  .then((response) => {
    response.forEach(function (recipe){
      console.log(recipe.title);
    });
  })
  .catch()

  Recipe.updateOne({ title: "Rigatoni alla Genovese" }, {duration:100})
    .then((response) => {
      console.log("Success!!!!!");
  })
  .catch()



    Recipe.deleteOne({ title: "Carrot Cake" })
    .then((response) => {
      console.log("Terminated!!!!!");
  })
  .catch()

  mongoose.connection.close()