const mongoose = require('mongoose')
const Recipe = require('./models/Recipe') // Import of the model Recipe from './models/Recipe'
const data = require('./data.js') // Import of the data from './data.js'

//create a new Recipe
const newCreate = {
  title: 'Cheesy Chicken Penne Bake',
  level: 'Amateur Chef',
  ingredients: ['milk', 'eggs', 'fish', 'shellfish', '3 nuts', 'peanuts', 'wheat', 'soybean'],
  cuisine: 'Italian',
  dishType: 'Dish',
  image:
    'https://res.cloudinary.com/hellofresh/image/upload/f_auto,fl_lossy,q_auto,w_1024/v1/hellofresh_s3/image/cheesy-chicken-penne-bake-b00c4041.jpg',
  duration: 30,
  creator: 'Alfonso'
}

// Connection to the database "recipeApp"
mongoose
  .connect('mongodb://localhost/recipeApp', { useNewUrlParser: true })
  .then(async () => {
    console.log('Connected to Mongo!')

    const recipes = await Recipe.create(newCreate)
    console.log(recipes.title)

    const recipesss = await Recipe.create(data)
    recipesss.forEach(rec => console.log(rec.title))

    await Recipe.findByIdAndUpdate({ title: 'Rigatoni alla Genovese' }, { duration: 100 })
    console.log('Updete 1 recipe')

    await Recipe.findByIdAndDelete({ title: 'Carrot Cake' })
    console.log('Delete 1 recipe')

    mongoose.connection.close()
  })

  .catch(err => {
    console.error('Error connecting to mongo', err)
  })
