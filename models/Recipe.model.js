const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const recipeSchema = new Schema({
  // TODO: write the schema
  title: { type: String, required: true },
  level: { type: String, enum: ["Easy Peasy", "Amateur Chef", "UltraPro Chef"] },
  ingredients: { type: [String] }
});

const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;

/* Syntax Reminder
const userSchema = new Schema(
    {
        name: { type: String },
        password: { type: String },
        job: { type: String }
    },
    { timestamps: true }
);

const userSchema = new Schema({
  email: {
    type: String
  },
  username: {
    type: String
  },
  avatarUrl: {
    type: String,
    default: 'images/default-avatar.png'
  }
});
*/