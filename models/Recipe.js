var mongoose = require("mongoose")
var Schema = mongoose.Schema

var Recipe = new Schema({
    title: {
        type:String,
        require:true,
        unique:true
    },
    level:{
        type:String,
        enum: [ "Easy Peasy", "Amateur Chef", "UltraPro Chef"]

    },
    ingredients: Array,
    cuisine:{
        type:String, 
        require:true,
    },
    dishType:{
        type:String,
        enum:[ "Breakfast", "Dish", "Snack", "Drink", "Dessert", "Other"]
    },
    image:{
        type:String,
        default:"https://images.media-allrecipes.com/images/75131.jpg"
    },
    duration:{
        type:Number,
        min:0
    },
    creator:String,
    created:{
        type:Date,
        default: new Date()
    }
    
},{
    timestamps: {
        createdAt: "created_at",
        updatedAt: "updated_at"
    }
 })