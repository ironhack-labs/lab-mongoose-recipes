const mongoose = require('mongoose');
const data = require('./data.js');

const Recipe = require('./modules/Recipe.js')

let recipe1 =  { 
  title: 'Asian Glazed Chicken Thighs',
  level: 'Amateur Chef',
  ingredients: ['1/2 cup rice vinegar', '5 tablespoons honey', '1/3 cup soy sauce (such as Silver Swan®)', '1/4 cup Asian (toasted) sesame oil', '3 tablespoons Asian chili garlic sauce', '3 tablespoons minced garlic', 'salt to taste', '8 skinless, boneless chicken thighs'],
  cousine: 'Asian',
  dishType: ['Dish'],
  image: 'https://images.media-allrecipes.com/userphotos/720x405/815964.jpg',
  duration: 40,
  creator: 'Chef LePapu'
}
mongoose.connect('mongodb://localhost/recipeApp',{ useNewUrlParser: true })
  .then(() => {
    console.log('Connected to Mongo!')
    Recipe.collection.drop()
    return Recipe.create(recipe1)
  })
  .then((recipe)=>{
    console.log(`Una ${recipe.title}`)
    return Recipe.insertMany(data)
  })
  .then((res)=>{
    res.forEach(recipe=>console.log(recipe.title))
  })
  .then(()=>{
    return Recipe.updateOne({title:"Rigatoni alla Genovese"},{duration:100})
  })
  .then((update)=>{
    console.log(update)
    mongoose.disconnect() 
  })
  .catch(err => {
    console.error('Error connecting to mongo', err)
  });

