const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let date_ob = new Date();

let date = ("0" + date_ob.getDate()).slice(-2);

let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);

let year = date_ob.getFullYear();



const recipeSchema = new Schema({
    // TODO: write the schema
    title: { type: String, required: true },
    level: { type: String, enum: ['Easy Peasy', 'Amateur Chef', 'Chef', 'UltraPro Chef'] }, // Only can be one of the following values:  -  Chef -  (remember the ENUM wink)
    ingredients: { type: [String] },
    cuisine: { type: String, required: true },
    dishType: { type: String, enum: ['Breakfast', 'Dish', 'Snack', 'Drink', 'Dessert', 'Other'] }, //Type String. Possible values:  - Dish - Snack -  - Dessert - .
    image: { type: String, default: 'https: //images.media-allrecipes.com/images/75131.jpg.' }, //Default value: 
    duration: { type: Number, min: 0 },
    creator: { type: String },
    created: { type: Date, default: year + "-" + month + "-" + date } //by default today


});

const Recipe = mongoose.model('Recipe', recipeSchema);
module.exports = Recipe;