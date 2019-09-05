const mongoose = require('mongoose');
const Recipe = require('./models/Recipe'); // Import of the model Recipe from './models/Recipe'
const data = require('./data.js');  // Import of the data from './data.js'


const newCreate = {
  title: 'AWADEOBO',
  level: 'Amateur Chef',
  cuisine: 'Mexican',
  ingredients: ['AWA', 'UWU'],
  dishType: 'Drink',
  duration: 1000,
  creator: 'UwU'
}


// Connection to the database "recipeApp"
mongoose.connect('mongodb://localhost/recipeApp', { useNewUrlParser: true })
  .then(async () => {
    console.log('Connected to Mongo!');
    //2
    // await Recipe.create(newCreate)
    // console.log(`New recipe created ${newCreate.title}`)
    const recipes = await Recipe.create(newCreate)
    console.log(recipes.title)
    //3
    const recipes2 = await Recipe.create(data)
    recipes2.forEach(rec =>console.log(rec.title))
    //4
    await Recipe.findOneAndUpdate({ title: 'Rigatoni alla Genovese' },
    { duration: 100 })
    console.log(`you update one recipe`)
    //5
    await Recipe.findOneAndDelete({title: 'Carrot Cake'})
    console.log('Carrot Cake Deleted')

    //6
    mongoose.connection.close()
    
  }).catch(err => {
    console.error('Error connecting to mongo', err);
  });

  



  //newCreate.forEach(rec => console.log(rec.title))
