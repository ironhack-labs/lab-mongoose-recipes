const mongoose = require('mongoose');

const Recipe = require('./models/Recipe.model');

const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

//Iteration 2
const newRecipe = new Recipe ({
  title: 'Batata Recheada de Micro-Ondas',
  level: 'Easy Peasy',
  ingredients: [
    '2 Batatas grandes',
    '100g Mussarela',
    '2 colheres de cram cheese',
    '50g de frango desfiado',
    '1 colher de margarina',
    'Cebolinha picada a gosto',
    'Sal a gosto',
    'Pimenta do reino a gosto'
  ],
  cuisine: 'Brasileira',
  dishType: 'main_course',
  image: 'https://cdn.panelinha.com.br/receita/1467255600000-Batata-assada-no-micro-ondas-recheada-com-cogumelo.jpg',
  duration: 20,
  creator: 'Weslley Fortunato',
})

mongoose.connect(MONGODB_URI)
  .then(x => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    return Recipe.deleteMany()
  })
  .then(() => {
    // Iteration 2
    Recipe.create(newRecipe)
    console.log(`Recipe ${newRecipe.title} created successfully!`, newRecipe)
    // Iteration 3
    return Recipe.insertMany(data)
  })
    // Iteration 4
  .then(() => {
    return Recipe.findOneAndUpdate({ title: 'Rigatoni alla Genovese' }, { $set: { duration: 100 }})
  })
  .then (() => {
    console.log('Recipe updated successfully!')
  })
    // Iteration 5
  .then(() => {
    return Recipe.deleteOne({ title: 'Carrot Cake' })
  })
  .then(() => {
    console.log('Recipe deleted successfully!')
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  })
   // Iteration 6
  .finally(() => {
    mongoose.connection.close(() => {
      console.log('Closing the connection')
      process.exit(0)
    })
  })