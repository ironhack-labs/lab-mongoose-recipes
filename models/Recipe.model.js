const mongoose = require('mongoose');


mongoose
.connect(process.env.MONGO_URI, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const Schema = mongoose.Schema;

const recipeSchema = new Schema({
  // TODO: write the schema
  title: {
    type:String,
    required:true
  },
  level:{
  type:String, 
  enum:["Easy Peasy", "Amateur Chef","UltraPro Chef"],
},
ingredients:[String],
cuisine: {
  type:String,
  required:true,
},
dishType:{
  type:String, 
  enum:[
    "breakfast",
    "main_course",
    "soup",
    "snack",
    "drink",
    "dessert",
    "other",
  ],
},
  image:{
    type:String,
    default:"https://images.media-allrecipies.com/images/75131.jpg"
  },
  duration:{
    type:Number, 
    min:0
  },
  creator:String, 
  created:{
    type:Date,
    default:Date.now()
  }
  
});

const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;
