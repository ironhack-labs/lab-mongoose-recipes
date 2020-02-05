const mongoose = require('mongoose');
const Recipe = require('./models/Recipe.model'); // Import of the model Recipe from './models/Recipe.model.js'
const data = require('./data.js'); // Import of the data from './data.js'

const Schema = mongoose.Schema;

// Connection to the database "recipeApp"
mongoose
  .connect('mongodb://localhost/recipe-app-dev', {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(x => console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`))
  return Recipe.deleteMany()
  .catch(err => console.error('Error connecting to mongo', err))

  .then(() => {

    const recipe = {
    title: 'Fried egg',
    level: 'UltraPro Chef',
    ingredients: ["1 or two eggs", "oil", "A little of magic"],
    cuisine: 'MasterChef',
    dishType: 'Dish',
    image: 'https://www.pequerecetas.com/wp-content/uploads/2015/11/huevo-frito-microondas.jpg',
    duration: 5,
    creator: 'Jota'
    }

    return Recipe.create(recipe)
    .then(recipe => console.log(recipe.title))
  })
  .then(() => {
    return Recipe.insertMany(data);
  })

  .then(() => {

    return Recipe.updateOne({title: 'Rigatoni alla Genovese'}, {duration: 100})

  })

  .then(()=> {

    return Recipe.deleteOne({title: 'Carrot Cake'});

  })

  .then(()=> {

    return mongoose.connection.close();



  })