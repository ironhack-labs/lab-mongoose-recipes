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
    // Before adding any documents to the database, let's delete all previous entries
    return self.connection.dropDatabase();
  })
  .then(async () => {

    const resultCreate = await Recipe.create({
      title: "Camarao ao Molho",
      ingredients: ['Camarao', 'Tomate'],
      cuisine: 'Haute',
      dishType: 'snack',
      duration: 120
    });
    console.log('Recipe created => ', resultCreate)

    const resultManyRecipe = await Recipe.create([
      { title: 'Churros', cuisine: 'Fusion', dishType: 'snack', duration: 20 },
      { title: 'Cha Mate', cuisine: 'Vegetarian', dishType: 'other', duration: 5 },
      { title: 'French Fries', cuisine: 'Fusion', dishType: 'snack', duration: 10 },
      { title: 'Rigatoni alla Genovese', cuisine: 'Fusion', dishType: 'main_course', duration: 500 },
      { title: 'Carrot Cake', cuisine: 'Vegetarian', dishType: 'dessert', duration: 50 }
    ]);
    console.log('MANY Recipe created => ', resultManyRecipe)

    const updateRigatoni = await Recipe.updateOne(
      {title: 'Rigatoni alla Genovese'},
      {duration: 100}
    );
    console.log(`Updated Rigatoni!!`, updateRigatoni)

    const deleteCake = await Recipe.deleteOne({title: 'Carrot Cake'});
    console.log('Deleted Cake! ', deleteCake)
  
    mongoose.connection.close()
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });

