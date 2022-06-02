const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const SchemaTypes = mongoose.SchemaTypes

const recipeSchema = new Schema({
  // TODO: write the schema
  title: {
    type: SchemaTypes.String,
    required: true,
    unique: true,
  },
  level: {
    type: SchemaTypes.String,
    enum: ["Easy Peasy", "Amateur Chef", "UltraPro Chef"],
  },
  ingredients: [{
    type: SchemaTypes.String,
  }],
  cuisine: {
    type: SchemaTypes.String,
    required: true,
  },
  dishType: {
    type: SchemaTypes.String,
    enum: ["breakfast", "main_course", "soup", "snack", "drink", "dessert", "other",
    ],
  },
  image: {
    type: SchemaTypes.String,
    default: "https://images.media-allrecipes.com/images/75131.jpg",
  },
  duration: {
    type: SchemaTypes.Number,
    min: 0
  },
  creator: {
    type: SchemaTypes.String
  },
  created: {
    type: SchemaTypes.Date,
    default: Date.now
  }
});

const Recipe = mongoose.model("Recipe", recipeSchema);

module.exports = Recipe;
