const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const recipeSchema = new Schema({
  // TODO: write the schema
  title: {type: String, unique: true},
  level: {type: String, enum: ['Easy Peasy', 'Amateur Chef', 'UltraPro Chef']},
  ingredients: [String],
  cuisine: {type: String, require: true },
  dishType: {type: String, enum: [breakfast, main_course, soup, snack, drink, dessert or other]},
  image: {
    String,
    default: 'images/default-image'
  },
  duration: Number,
  creator: String,
  created: Date
})

recipeSchema.save()
  .then(
      recipeSchema => {
        console.log(`${recipeSchema.title} created!`)
      })
      .catch(err => {
        console.error(err)
      })

const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;
