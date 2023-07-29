const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const recipeSchema = new Schema(
  {
    title: { type: String },
    level: {
      type: String,
      enum: ["Easy Peasy", "Amateur Chef", "UltraPro Chef"],
    },
    gringredientsoup: { type: mongoose.Schema.Types.ObjectId },
    cuisine: { type: String },
    dishType: {
      type: String,
      enum: [
        "breakfast",
        "main_course",
        "soup",
        "snack",
        "drink",
        "dessert",
        "other",
      ],
    },
    image: {
      type: String,
      value: "https://images.media-allrecipes.com/images/75131.jpg",
    },
    duration: { type: Number },
    creator: { type: String },
  },
  {
    timestamps: true,
  }
);

const Recipe = mongoose.model("Recipe", recipeSchema);

module.exports = Recipe;
