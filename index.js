const mongoose = require('mongoose');
const Recipe = require('./models/Recipe'); // Import of the model Recipe from './models/Recipe'
const data = require('./data.js');  // Import of the data from './data.js'

// Connection to the database "recipeApp"
mongoose.connect('mongodb://localhost/recipeApp', { useNewUrlParser: true })
  .then(() => {
    console.log('Connected to Mongo!');
  }).catch(err => {
    console.error('Error connecting to mongo', err);
  });

// create method
Recipe.create({
  title: 'omelete',
  level: 'Easy Peasy',
  ingredients: ['egg','butter','salt'],
  cuisine: 'American',
  dishType: 'Breakfast',
  image: 'https://receitinhas.s3-sa-east-1.amazonaws.com/wp-content/uploads/2017/09/Depositphotos_19636187_l-2015-848x477.jpg',
  duration: 15,
  creator: 'Oliver',
  created: 7/3
})
.then((recipe)=>{
    console.log('dot create worked');
    console.log(recipe.title);
})
.catch((err)=>{
    console.log('dot create didnt work', err)
})

//insertMany Method
Recipe.insertMany(data)
.then((recipes)=>{
    console.log('insertMany worked');
    recipes.forEach(function(rec){
      console.log(rec.title);
    })
    
})
.catch((err)=>{
    console.log('insertMany failed', err)
})

//update info
Recipe.findByIdAndUpdate('5d1d511bbf9a1820050509ce', {
      duration: 100
})
.then(()=>{
  console.log('succesful');
})
.catch((err)=>{
    console.log('update failed', err)
})


//delete recipe
Recipe.deleteOne({title: "Carrot Cake"})
.then(()=>{
  console.log('succesful');
})
.catch((err)=>{
    console.log('dot create didnt work', err)
})