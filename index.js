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

  Recipe.create({
    title: 'Hot Pot',
    level: 'Easy Peasy',
    ingredients: 'tofu',
    cuisine: 'Asian',
    dishType: 'Dish',
    image:'https://bmexdi064h-flywheel.netdna-ssl.com/wp-content/uploads/2018/02/Asian-Red-Curry-Hot-Pot-foodiecrush.com-047.jpg',
    durantion: '20',
    creator: 'Yang',
    created: '01/01/1200',

  })



  Recipe.insertMany(data)
  .then(resOk => {
    console.log(Recipe.title);
  }).catch(err => {
    console.log(err);
  })


Recipe.update({title: 'Rigatoni alla Genovese'},  {duration:100})
.then(resOk => {
  console.log("Success")
}).catch(err => {
  console.log(err);
})

Recipe.deleteOne({title: "Carrot Cake"})
.then(resOk => {
  console.log("Success")
}).catch(err => {
  console.log(err);
})
