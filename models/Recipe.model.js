const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const recipeSchema = new Schema({
  // TODO: write the schema
  // Iteration 1
    // Example client_model from class
    // name: {type: String, required: true, unique: true}, // Schema defintion object
    // age: {type: Number, min: 18, max: 60},
    // accountActive: {type: Boolean, default: false},
    // balance: {type: Number, default: 0} ,
    // role: {type: String, enum: ["client", "employee"]}, // This will make sure that the strings mathc the enum fully (prevents spelling mistake)
    // payments: Array,
    title: {type: String, required: true, unique: true},
    level: {type: String, enum: ["Easy Peasy",  "Amateur Chef", "UltraPro Chef"]}, // enum
    ingredients: {type: [String]}, 
    cuisine: {type: String, required: true},
    dishType: {type: String, enum: ["breakfast", "main_course", "soup", "snack", "drink", "dessert", "other"]}, 
    image: {type: String, default: "https://images.media-allrecipes.com/images/75131.jpg"},
    duration: {type: Number, min: 0},
    creator: {type: String},
    created: {type: Date, default: Date.now}, 
});

const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;
