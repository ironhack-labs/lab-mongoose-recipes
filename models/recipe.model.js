

const moongose =require('mongoose');

const LEVEL_TYPES = ["Easy Peasy", "Amateur Chef", "UltraPro Chef"];
const DISH_TYPES = ["Breakfast", "Dish", "Snack", "Drink", "Dessert", "Other"];

const recipeSchema= new moongose.Schema({
    title: {
        type: String,
        require: true,
        unique: true
    },
    level: {
        type: String,
        enum: LEVEL_TYPES
    },
    ingredients: [String],
    cuisine: {
        type: String,
        required: true
    },
    dishType: DISH_TYPES,
    image: {
        type: String,
        default: 'https://images.media-allrecipes.com/images/75131.jpg'
    },
    duration: {
        type: Number,
        min: 0
    },
    creator: String,
    created: {
        type: Date,
        default: Date.now
    }
});

const Recipe = mongoose.model('Recipe',recipeSchema);
module.exports=Recipe;


