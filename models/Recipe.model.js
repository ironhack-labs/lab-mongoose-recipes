//mongooseをインポート
const mongoose = require('mongoose')
//mongooseで”Schema”という名前の雛形を作成する
const Schema = mongoose.Schema
//雛形を使って新しいスキーマ"recipeSchema"を作成する
const recipeSchema = new Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  level: {
    type: String,
    enum: ['Easy Peasy', 'Amateur Chef', 'UltraPro Chef'],
  },
  ingredients: [String],
  cuisine: {
    type: String,
    required: true,
  },
  dishType: {
    type: String,
    enum: ['breakfast', 'main_course', 'soup', 'snack', 'drink', 'dessert'],
  },
  image: {
    type: String,
    default: 'https://images.media-allrecipes.com/images/75131.jpg',
  },
  duration: {
    type: Number,
    min: 0,
  },
  creator: {
    type: String,
  },
  created: {
    type: Date,
    default: Date.now,
  },
})
//”recipeSchema”から新しいRecipeモデルを生成する
const Recipe = mongoose.model('Recipe', recipeSchema)
//"Recipe"モデルのモジュールをエキスポート
module.exports = Recipe
