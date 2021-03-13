const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const recipeSchema = new Schema(
  {
    title: { type: String, required: true, unique: true },
    level: {
      type: String,
      enum: ["Easy Peasy", "Amateur Chef", "UltraPro Chef"],
    }, //ENUM são os níveis - acho que é sempre array
    ingredientes: [{ type: String }],
    cuisine: { type: String, required: true },
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
      default: "https://images.media-allrecipes.com/images/75131.jpg",
    },
    duration: { type: Number, min: 0 },
    creator: { type: String },
  },
  {
    timestamps: true, //vai criar um campo que faz a data que o documento foi criado e cada vez que ele for atualizado
  }
);

const Recipe = mongoose.model("Recipe", recipeSchema);
//recipe schema é onde vão estar as regras para a gente conseguir criar um novo documento

module.exports = Recipe;
