const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const data = require('./data.js')

mongoose.connect('mongodb://localhost/recipeApp')
  .then(() => {
    console.log('Connected to Mongo!')
  }).catch(err => {
    console.error('Error connecting to mongo', err)
  });

const recipeSchema = new Schema ({
  title: { type: String, required: true, unique: true }, // It should be required and unique.
  level: { type: String, enum: ['Easy Peasy', 'Amateur Chef', 'UltraPro Chef'] }, // Only values: Easy Peasy - Amateur Chef - UltraPro Chef
  ingredients: [],
  cuisine: { type: String, required: true }, // Should be required
  dishType: { type: String, enum: ['Breakfast', 'Dish', 'Snack', 'Drink', 'Dessert', 'Other'] }, // Possible values: Breakfast - Dish - Snack - Drink - Dessert - Other.
  image: { type: String, default: 'https://images.media-allrecipes.com/images/75131.jpg' }, // Default value: https://images.media-allrecipes.com/images/75131.jpg.
  duration: { type: Number, min: 0 }, // Min value should be 0.
  creator: String,
  created: { type: Date, default: Date.now }, // By default today.
});

const Recipe = mongoose.model('Reciper', recipeSchema);

const smoothie = {
  title: 'Early Smoothie',
  level: 'Easy Peasy',
  ingredients: ['Kale', 'Flax-seeds', 'Banana', 'Peanut Butter', 'Ginger', 'Blueberries'],
  cuisine: 'Vegan',
  dishType: 'Breakfast',
  image: 'https://www.google.com/search?q=smoothie&rlz=1C5CHFA_enUS713US714&source=lnms&tbm=isch&sa=X&ved=0ahUKEwiJ1enMroTcAhWGtlkKHfJHCdAQ_AUICygC&biw=1280&bih=680#imgrc=_MMLHxgFHC_y9M:',
  duration: 20,
  creator: 'Yandy',
}

// Recipe.create(smoothie)
//   .then((recipe) => { console.log(`Recipe title ${recipe.title}`) })
//   .catch((err) => { console.log(`An error happened ${err}`) });

// Recipe.insertMany(data)
//   .then((recipe) => { console.log(`Recipe title ${recipe.title}`) })
//   .catch((err) => { console.log(`An error happened: ${err}`) });

Recipe.updateOne({ title: 'Rigatoni alla Genovese' }, { duration: 100 })
  .then(() => { console.log(`Duration updated`) })
  .catch((err) => { console.log(`An error happened: ${err}`) });

Recipe.deleteOne({ title: 'Carrot Cake' })
  .then((recipe) => { console.log(`${recipe.title } Deleted`) })
  .catch((err) => { console.log(`An error happened: ${err}`) });