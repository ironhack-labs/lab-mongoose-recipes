const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

const recipeSchema = new Schema({
  title: String,
  
  // TODO! Add equivalent frontend validation check, or pass this message to user
  level: {
    type: String,
    validate: {
      validator: function(v) {
        return /^([^0-9]*)$/.test(v);  // Does not contain numbers
      },
      message: props => `${props.value} contain numbers! Please just use letters.`
    }
  },

  ingredients: Array,
  cuisine: String,
  dishType: String,
  image: String,
  duration: Number,
  cook: { type : ObjectId, ref: 'cooks' }
});


const Recipe = mongoose.model('recipes', recipeSchema);
module.exports = Recipe;