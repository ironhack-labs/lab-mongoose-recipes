const mongoose = require('mongoose');
const Recipe = require('./models/Recipe.model'); // Import of the model Recipe from './models/Recipe.model.js'
const data = require('./data.js'); // Import of the data from './data.js'

Recipe.create({
  title: 'Pasta',
  level: 'Easy Peasy',
  ingredients: ['pasta', 'tomato sauce', '1/2 onion'],
  cuisine: 'italian',
  dishType: 'Dish',
  image: 'https://images.media-allrecipes.com/userphotos/720x405/815964.jpg',
  duration: 40,
  creator: 'Moi'
})
    .then(recipe => { console.log('The recipe is saved and is: '+recipe.title) })
    .catch(err => { console.log('An error happened:', err)
});

Recipe.insertMany(data)
.then(recipe => {recipe.map(data => console.log('The recipe saved is: '+ data.title))})
.catch(err => { console.log('An error happened:', err)
});


Recipe.updateOne({ title: 'Rigatoni alla Genovese' }, { duration: '100' }, {new: true})
  .then(recipe => console.log("Yeah,recipe updated"))
  .catch(error => console.log(error));


Recipe.deleteOne({ title: "Carrot Cake"})
    .then(recipe => console.log("Yeah,recipe deleted"))
    .catch(error => console.log(error));


// Connection to the database "recipeApp"
mongoose
  .connect('mongodb://localhost/recipe-app-dev', {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(x => console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`))
  .catch(err => console.error('Error connecting to mongo', err));

//close the connection
 mongoose.connection.close()