const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const recipeSchema = new Schema(
  {
    // TODO: write the schema
    title: { type: String, unique: true },
    level: {
      type: String,
      enum: ["Easy Peasy", "Amateur Chef", "UltraPro Chef"],
    },
    ingredients: [String],
    cuisine: { type: String, required: true },
    dishType: String,
    image: String,
    duration: Number,
    creator: String,
    created: Date,
  },
  {
    timestamps: true,
  }
);

const Recipe = mongoose.model("Recipe", recipeSchema);

module.exports = Recipe;
