const { Schema, model } = require('mongoose');

const recipeSchema = new Schema({
  title: {
    type: String,
    unique: true,
    required: true,
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
    enum: ['breakfast', 'main_course', 'soup', 'snack', 'drink', 'dessert', 'other'],
  },
  image: {
    type: String,
    default: "https://images.media-allrecipes.com/images/75131.jpg",
  },
  duration: {
    type: Number,
    min: 0,
  },
  creator: String,
  created: {
    type: Date,
    default: new Date(),
  }
  /*title - Type String.It should be required and unique.
    level - Type String.Can be one of the following values: Easy Peasy - Amateur Chef - UltraPro Chef(remember the enum validator wink).
    ingredients - Type Array of Strings(represented as [String]).
    cuisine - Type String.Should be required.
    dishType - Type String.Possible values: breakfast, main_course, soup, snack, drink, dessert or other.
    image - Type String.Default value: "https://images.media-allrecipes.com/images/75131.jpg".
    duration - Type Number.The minimum value should be 0.
    creaor - Type String.
    created - Type Date.By default, today*/
});

module.exports = model('Recipe', recipeSchema);
