const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const data = require('../data.json')


// iter 1
const recipeSchema = new Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  level: {
    type: String,
    enum: ['Easy Peasy', 'Amateur Chef', 'UltraPro Chef']
  },
  ingredients: [String],
  cuisine: {
    type: String,
    required: true,
  },
  dishType: {
    type: String,
    enum: ['breakfast','main_course','soup','snack','drink','dessert','other']
  },
  image: {
    type: String,
    default: "https://images.media-allrecipes.com/images/75131.jpg"
  },
  duration: {
    type: Number,
    min: 0,
  },
  creator: String,
  created: {
    type: Date,
    default: new Date()
  }
});


const Recipe = mongoose.model('Recipe', recipeSchema);

// iter 2
// Recipe.create({
//   title: 'Musaka',
//   level: 'Amateur Chef',
//   ingredients: ['Potatoes','Minced meat','Eggs','Milk','Chubritsa','Tomato puree'],
//   cuisine: 'Bulgarian',
//   dishType: 'main_course',
//   image: 'https://img2.kochrezepte.at/450x300/1/musaka_1410.jpg',
//   duration: 50,
//   creator: 'Pavel Popov',
// })

// iter 3
// Recipe.insertMany(data)
// .then(newData => console.log(newData))
// .catch(err => console.log('Failed with error:' + err))

// iter 4
// Recipe.findOneAndUpdate({title: 'Rigatoni alla Genovese'},{duration: 100},{new: true})
// .then(updatedRecipe => console.log(updatedRecipe))
// .catch(err => console.log(err))

// iter 5
// Recipe.deleteOne({title: 'Carrot Cake'})
// .then(deletedRecipe => console.log('Succesfully deleted:' + deletedRecipe))
// .catch(err => console.log('Error:' + error))

mongoose.connect('mongodb://localhost:27017/recipes-lab')
.then(() => {
    console.log('Connected succesfully')
})
.catch(err => {
    console.log('Failed with error:' + err)
})


module.exports = Recipe;
