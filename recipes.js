const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const data = require('./data.js')


mongoose.connect('mongodb://localhost/recipeApp')
  .then(() => {
    console.log('Connected to Mongo!')
  }).catch(err => {
    console.error('Error connecting to mongo', err)
  });


const recipeSchema = new Schema({
  title: String,
  level: {
    type: String,
    enum: ['Easy Peasy', 'Amateur Chef', 'UltraPro Chef']
  },
  ingredients: Array,
  cousine: { type: String, required: true },
  dishType: {
    type: String,
    enum: ['Breakfast', 'Dish', 'Snack', 'Drink', 'Dessert', 'Other']
  },
  image: {
    type: String,
    default: 'https://images.media-allrecipes.com/images/75131.jpg',
  },
  duration: { type: Number, min: 0 },
  creator: String,
  created: {
    type: Date,
    default: Date.now
  }
});

const Recipe = mongoose.model('Recipe', recipeSchema)

Recipe.create({
  title: "Sushi",
  ingredients: ["rice", "salmon", "ginger", "wasabi"],
  cousine: "Japanese",
}).then((recipe) => {
  console.log(recipe);
}).catch(console.error)

Recipe.insertMany(data).then((result) => {
  console.log(result.title);
}).catch(console.error)

Recipe.updateOne({ title: "Rigatoni alla Genovese" }, { duration: 100 })
  .then((result) => { result }).catch(console.error)

Recipe.remove({ title: "Carrot Cake" })
  .then((result) => { result }).catch(console.error)
// .then(() => {
//   mongoose.connection.close();
// })


process.on('SIGINT', () => {
  mongoose.connection.close().then(() => {
    console.log('Closed db connection')
    process.exit(0)
  })
})