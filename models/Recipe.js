const mongoose = require('mongoose');
const Schema   = mongoose.Schema

var rRcipe = new Schema({
  title:{
    type: String,
    required: true,
    unique:true
  },
  level:{
    type: String,
    enum:['Easy easy', 'Amateur chef','UltraPro chef']
  },
  ingredients: Array,
  cuisine:{
    type: String,
    required: true,
  },
  dishType:{
    type: String,
    enum:['Breakfast', 'Dish','Snack','Drink', 'Dessert', 'Other']
  },
  image:{
    type: String,
    default: ' https://images.media-allrecipes.com/images/75131.jpg'
  },
  duration:{
    type: Number,
    min:0
  },
  creator: String,
  created:{
    type:Date,
    default: new Date()
  }
},{

  timestamps:{
    createdAt:'create_at',
    updatedAt: 'update_at'
  }

})