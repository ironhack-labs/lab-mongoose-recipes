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
    useUnifiedTopology: true,
    useFindAndModify: false
  })
  .then(self => {
    console.log(`Connected to the database: "${self.connection.name}"`);
    // Before adding any documents to the database, let's delete all previous entries
    return self.connection.dropDatabase();
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made

    const pizzaRecipe = new Recipe({
      title: 'Pizza caprese',
      level: 'Easy Peasy',
      ingredients: ['Tomato', 'Mozzarella', 'Pizza dough', 'Salt', 'Oregano', 'Garlic'],
      cuisine: 'Italian',
      dishType: 'other',
      image: 'https://www.albal.net/image-Pizza-Caprese-Casera,51939923ed5d938e4b27ed96631b531264bf6f54.jpg',
      duration: 45,
      creator: 'Andrea',
    });
    Recipe.create(pizzaRecipe)
    .then(pizzaRecipe => console.log(pizzaRecipe.title))
    // Otra forma de hacer el ej de arriba con mismo resultado:
    // pizzaRecipe.save()
    // .then((pizzaRecipe) => console.log(pizzaRecipe.title))
    .catch(e => console.log('Error creating recipe', e))

    Recipe.insertMany(data)
    .then(allRecipes => allRecipes.forEach(recipe => console.log(recipe.title)))
    .then(() => 
      Recipe.findOneAndUpdate({ title: 'Rigatoni alla Genovese' }, { duration: 100 }, { new: true})
      )
      .then(rigatoniRecipe => console.log(`Congrats! You updated the ${rigatoniRecipe.title} recipe. The duration now is ${rigatoniRecipe.duration}`))   
      .catch(error => console.log(`Sorry, you didn't update the Rigatoni recipe.`, error))
    .then(() => Recipe.deleteOne({ title: 'Carrot Cake' }))
    .then(() => console.log('You succesfully deleted the Carrot Cake recipe'))
    .then(() => {
      Recipe.find({}, {title: 1, _id: 0})
      .then(allRecipes => console.log(`These are the remaining recipes ${allRecipes}`))
      .then(() => {
        mongoose.connection.close()
        console.log(`The database is now closed`)
      })
    })
         
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });


