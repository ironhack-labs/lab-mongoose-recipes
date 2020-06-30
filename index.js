const mongoose = require('mongoose');
const Recipe = require('./models/Recipe.model');
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';
mongoose.set('useFindAndModify', false);

const myRecipe = {
  title: 'Pumpkin Pancakes',
  level: 'Easy Peasy',
  ingredients: ['250g pumpkin', '2 eggs', '1 tbsp brown sugar', '25g butter', '125ml milk', '200g plain flour', '2.5 tsp baking powder'],
  cuisine: 'American',
  dishType: 'breakfast',
  image: 'https://images.media-allrecipes.com/images/75131.jpg',
  duration: 30,
  creator: 'someone',
  date: new Date()
}

mongoose
  .connect(MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(self => {
    console.log(`Connected to the database: "${self.connection.name}"`);
    return self.connection.dropDatabase();
  })
  .then(() => {
    const newRecipe = Recipe.create(myRecipe)
    .then(recipe => console.log(recipe.title))
    .catch(error => console.error('Creating new recipe error:', error))

    .then(() => Recipe.insertMany(data)
      .then(recipes => recipes.forEach(r => console.log(r.title)))
      .catch(error => console.error('Inserting recipe error:', error))
    )
    .then(() => Recipe.findOneAndUpdate({title: 'Rigatoni alla Genovese'}, { $set: {duration: '100'}}, {new: true})
      .then((recipe) => console.log('Successfully updated:', recipe))
      .catch(error => console.error('Updating recipe error:', error))
    )
    .then(() => Recipe.deleteOne({title: 'Carrot Cake'})
      .then((res)=> console.log('Successfully deleted:', res))
      .catch(error => console.error('Recipe deletion error:', error))
    )
    .then(() => {
      mongoose.connection.close()
      .then(()=> console.log('Mongoose connection closed'))
      .catch(error => console.error('Mongoose disconnection error:', error))
    })
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });
  
