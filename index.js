const mongoose = require('mongoose');
const Recipe = require('./models/Recipe'); // Import of the model Recipe from './models/Recipe'
const data = require('./data.js');  // Import of the data from './data.js'

// Connection to the database "recipeApp"
mongoose.connect('mongodb://localhost/recipeApp', { useNewUrlParser: true })
.then(() => {
  console.log('Connected to Mongo!')
  mongoose.connection.db.dropDatabase();
  createRecipe()
  .then((recipe) => { 
    console.log('The recipe is saved and its value is: ', recipe) 
    insertMany()
    .then((recipes) => { 
      console.log('The recipe is saved and its value is: ', recipes) 
      updateRecipe()
      .then((recipe) => { 
        console.log('Update the recipe')
        removeRecipe()
        .then((recipe) => { 
          console.log('Removed the recipe')
          mongoose.connection.close();
        })
        .catch((err) => { console.log('An error happened:', err) })
      })
    })
  })
  .catch((err) => { console.log('An error happened:', err) });
}).catch(err => {
  console.error('Error connecting to mongo', err)
});


createRecipe = () => {
  return Recipe.create({ title: 'Empadão de Carne',
                level: 'Amateur Chef',
                ingredients: ['batata', 'manteiga', 'leite', 'noz-moscada', 'sal e pimenta', 'carne de vaca picada', 'chouriço', 'cebola', 'alho', 'gema de ovo', 'azeite', 'salsa picada'],
                cuisine: 'Portuguese',
                dishType: 'Dish',
                duration: 60,
                creator: 'Gonçalo' })
    .then(title => { console.log(`This is the recipe for: Empadão de carne `) })
    .catch(err => { console.log('An error happened:', err) })
};

insertMany = () => { 
  return Recipe.insertMany(data)
};

updateRecipe = () => {
  return Recipe.update( {title: 'Rigatoni alla Genovese'}, { $set: { duration: 100 } })
};

removeRecipe = () => {
  return Recipe.remove( {title: 'Carrot Cake'} )

};