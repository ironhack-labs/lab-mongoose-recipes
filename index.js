const mongoose = require('mongoose');
const Recipe = require('./models/Recipe.model'); // Import of the model Recipe from './models/Recipe.model.js'
const data = require('./data.js'); // Import of the data from './data.js'

// Connection to the database "recipeApp"
mongoose
  .connect('mongodb://localhost/recipe-app-dev', {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(x => console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`))
  .catch(err => console.error('Error connecting to mongo', err));


  let recipe1 = {
    title: "Canelones",
    level: "Amateur Chef",
    ingredients: ['Pasta', 'Tomato Sauce', 'Stuff', 'Cheese'],
    cuisine: 'Italian',
    dishType: 'Dish',
    image: "https://vod-hogarmania.atresmedia.com/hogarmania/images/images01/2019/07/02/5d1b045afa7dec0001ed7027/1239x697.jpg",
    duration: 30,
    creator: 'Giuliano Calzonetti'  
  }
  
Recipe.create( recipe1 , (err, result) => {
    if (err) console.log(err);
    else console.log('Recipe inserted', result);
  }
);


Recipe.insertMany(data)
.then( (data) => {
  data.forEach( (recipe) =>{ console.log(recipe.title)})
})
.catch(err=> console.log(err))



Recipe.deleteOne({ title:'Carrot Cake'})
  .then( (result) => console.log('Carrot Cake deleted'))
  .catch(err => console.log(err));



const updateRigatoneTime = [{duration: 100}];

Recipe.findOneAndUpdate({ title: 'Rigatoni a la Genovese' }, { $set: { duration: updateRigatoneTime } })
  .then((result) => {
   console.log('Rigatoni duration updated')

   mongoose.connection.close()
  })
  .catch(err => console.log(err));