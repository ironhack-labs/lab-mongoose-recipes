const Recipe = require('./models/Recipe'); // Import of the model Recipe from './models/Recipe'
const data = require('./data.js');  // Import of the data from './data.js'

const myRecipe = {
  title: 'Tacos al Pastor',
  level: 'Easy Peasy',
  ingredients: ['Pastor', 'Tortilla', 'silantro'],
  cuisine: 'Mexican',
  dishType: 'Other',
  duration: 5,
  creator: 'guille',
  created: '30/08/1960'
}




// Connection to the database "recipeApp"
mongoose.connect('mongodb://localhost/recipeApp', { useNewUrlParser: true })

Recipe.create(myRecipe)
  .then(() => {
    console.log(`Connected to Mongo! Created recipe with title ${myRecipe.title}`)
    mongoose.connection.close()
  })
  .catch(err => {
    console.error('Error connecting to Mongo', err)
    mongoose.connection.close()
  })

Recipe.updateOne({ title: 'Rigatoni alla Genovese' }, { duration: 100 })
  .then(() => {
    console.log('Connected to Mongo!');
  }).catch(err => {
    console.error('Error connecting to mongo', err);
  });
    console.log(`Updated recipe`)
    mongoose.connection.close()
  })
  .catch(err => {
    console.error('Error connecting to Mongo', err)
    mongoose.connection.close()
  })


Recipe.deleteOne({ title: 'Carrot Cake' })
  .then(() => {
    console.log(`Deleted recipe`)
    mongoose.connection.close()
  })
  .catch(err => {
    console.error('Error connecting to Mongo', err)
    mongoose.connection.close()
  })
})