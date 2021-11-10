const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(self => {
    console.log(`Connected to the database: "${self.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones);
    return Recipe.deleteMany()
  }).then(() => Recipe.syncIndexes())
    .then( () =>  Recipe.create(
    {
    title: "Milanesas con Papas Fritas",
    level:'Amateur Chef',
    ingredients: [
      '8 beef steaks 1cm thick',
      '1 bag of breadcrumbs', 
      '6 Eggs',
      '1 pinch cayenne pepper',
      '1 pinch salt'
    ],
    cuisine:'Argentina',
    dishType: 'main_course',
    image: 'https://static3.diariovasco.com/www/multimedia/202107/16/media/cortadas/MILANESA-R7jYwhgmCWZSZc1g1kG5qzM-624x385@Diario%20Vasco.jpg',
    duration: 60,
    creator: "Chef Manuel",
    created: '',
  }))
  .then(recipe => console.log('Se ha creado estos registros:', Recipe))
  // .then( () => Recipe.create(data))
  .then(recipe => {
    return Recipe.create(data)
  })
    .then(recipe => {
      console.log(recipe)
      return Recipe.findOneAndUpdate({title:"Rigatoni alla Genovese"},{ duration: 100 },{new: true})
    }).then(recipe => {
      console.log(recipe)
      return Recipe.deleteOne({title: "Carrot Cake"})
  })
  .then(() => mongoose.connection.close())
  .catch(error => {
    console.error('Error connecting to the database', error);
  });
