const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const recipeSchema = new Schema({
  // TODO: write the schema
  title:{
    type: String,
    require:[true, "the title is require"],
    unique:[true, ""]
  },
    level:{
    type: String,
    enum:["Easy Peasy","Amateur Chef","UltraPro Chef"],
    require:[true, "the title is require"]
  },
    ingredients:{
    type: [String],
    require:[true, "the title is require"]
  },
  cusine:{
    type:String,
    require:[true, "the cusine is require"]
  },
  dishType:{
    type: String,
    enum:["breakfast","main_course","soup", "snack","drink","dessert","other"]
  },
  image:{
    type:String,
    default: "https://images.media-allrecipes.com/images/75131.jpg"
  },
  duration:{
    type: Number,
    min: 0
  },
  creator:{
    type:String
  },
  created:{
    type: Date,
    default: Date.now()
  }

});

const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;
