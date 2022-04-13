const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const recipeSchema = new Schema({
    title: {
        unique: true,
        type: String,
        required: true,
        default: "no title",

        // preguntar  a German
    },

    level: {
        type: String,
        enum: ["Easy Peasy", "Amateur Chef", "UltraPro Chef"],
    },
    ingredients: {
        type: [String],
    },

    cuisine: {
        type: String,
        required: true,
        default: "no cuisine",
    },
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
    duration: {
        type: Number,
        min: 0,
    },
    creator: {
        type: String,
    },
    created: {
        type: Date,
        default: () => {
            return Date();
        },
    },
});

const Recipe = mongoose.model("Recipe", recipeSchema);

module.exports = Recipe;
