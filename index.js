const mongoose = require('mongoose');
const Recipe = require('./models/Recipe.model'); // Import of the model Recipe from './models/Recipe.model.js'
const data = require('./data.js'); // Import of the data from './data.js'
//iteration 2
// Recipe.create({
//         title: 'Asian Glazed Chicken Thighs',
//         level: 'Amateur Chef',
//         ingredients: ['1/2 cup rice vinegar', '5 tablespoons honey', '1/3 cup soy sauce (such as Silver Swan®)', '1/4 cup Asian (toasted) sesame oil', '3 tablespoons Asian chili garlic sauce', '3 tablespoons minced garlic', 'salt to taste', '8 skinless, boneless chicken thighs'],
//         cuisine: 'Asian',
//         dishType: 'Dish',
//         image: 'https://images.media-allrecipes.com/userphotos/720x405/815964.jpg',
//         duration: 40,
//         creator: 'Chef LePapu'
// }).then(recipe => { console.log('The user is saved and its value is: ', recipe) })
// .catch(err => { console.log('An error happened:', err)})

//iteration 3
// Recipe.insertMany(data)
// .then(data => console.log(data))
// .catch(error => console.log('error en insertMany'))

//iteration 4
// Recipe.updateOne({ title: 'Rigatoni alla Genovese'}, {duration: '100'},{new: true})
// .then(data => console.log(Recipe[0]))
// .catch(error => console.log('error en updteOne'))

//iteration 5
Recipe.deleteOne({ title: 'Carrot Cake'})
.then(data => console.log(Recipe[0]))
.then(()=>mongoose.disconnect())
.catch(error => console.log('error en updteOne'))

//iteration 6



// Connection to the database "recipeApp"

mongoose
  .connect('mongodb://localhost/recipe-app-dev', {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(x => console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`))
  .catch(err => console.error('Error connecting to mongo', err));

  