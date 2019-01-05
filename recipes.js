const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const data = require('./data.js');
const Recipe = require('./models/Recipe');

mongoose.connect('mongodb://localhost/recipeApp')
  .then(() => {
    console.log('Connected to Mongo!');
  }).catch(err => {
    console.error('Error connecting to mongo', err);
  });

const recipe = [
  {
    title: 'Receta 1',
    level: 'Amateur Chef',
    ingredients: ['1/2 cup rice vinegar', '5 tablespoons honey', '1/3 cup soy sauce (such as Silver Swan®)', '1/4 cup Asian (toasted) sesame oil', '3 tablespoons Asian chili garlic sauce', '3 tablespoons minced garlic', 'salt to taste', '8 skinless, boneless chicken thighs'],
    cuisine: 'Asian',
    dishType: ['Dish'],
    image: 'https://images.media-allrecipes.com/userphotos/720x405/815964.jpg',
    duration: 40,
    creator: 'Chef LePapu'
  }
]

Recipe.create(recipe)
.then(()=>{
  console.log(`Created ${recipe[0].title} recipe`)
  Recipe.insertMany(data)
  .then(()=>{
    console.log("Created datarecipe")
    Recipe.updateOne({title:"Rigatoni alla Genovese"},{duration:100})
    .then(()=>{
      console.log("Update successful")
      Recipe.find({},["title"])
      .then((data)=>{
        console.log(data);
        Recipe.deleteOne({title: "Carrot Cake"})
        .then((data)=>{
          console.log("Delete Carrot Cake");
          mongoose.connection.close()
        })
        .catch(err=>console.log(err));
      })
      .catch(err=>console.log(err));
    })
    .catch(err=>{
      throw(err)
    })
  })
  .catch(err=>{
    throw(err)
  })
})
.catch(err=>{
  throw(err)
})
