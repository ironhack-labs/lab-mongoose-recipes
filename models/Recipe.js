const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const recipeSchema = new Schema({
    title: {
        type: String,
        required:true,
        unique:true
    },
    level:{
        enum: ['Easy Peasy','Amateur Chef','UltraPro Chef']
    },
    ingredients:[String],
    cousine:{
        type: String,
        required: true
    },
    dishType:{
        Type:String,
        enum: ['Breakfast','Dish', 'Snack','Drink','Dessert','Other']
    },
    image:{
        type:String,
        default:'https://images.media-allrecipes.com/images/75131.jpg'
    },    
    duration:{
        type: Number,
        min: 0
    },
    creator: String,
    created:{
        type: Date,
        default: Date.now
    }

}, {
    timestamps:{
        createdAt:'created_at',
        updatedAt:'updated_at'
    }
});

//Sobra-- Revisar

module.exports = mongoose.model('Recipe', recipeSchema);