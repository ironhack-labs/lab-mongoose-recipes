const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const recipeSchema = new Schema({
  // TODO: write the schema
    title:{type:String, required: true , unique: true},
    level:{type: String,enum:["Easy Peasy" , "Amateur Chef", "UltraPro Chef"]},
    ingredients:{type:[String]},
    cuisine:{type:String, required: true},
    dishType:{type:String,enum:["breakfast","main_course","soup","snack","drink","dessert","other"]},
    image:{type:String, default:"https://images.media-allrecipes.com/images/75131.jpg"},
    duration:{type:Number,min:0},
    creator:String,
    created:{type:Date,default:Date.now()}

});

const Recipe = mongoose.model('Recipe', recipeSchema);


module.exports = Recipe;

//creating a model:
 //blueprint /model Cat--
  //const Cat = mongoose.model('Cat', { name: String });
// ^called 'cat' model  .... Cat is constructor function-- "Cat" decides what the name of the collections will be
//Cat constructor function creates objects with field "name" & "String" type
//{name.String} is 2nd arg. passed to mongoose.model called "Schema" .... {name:string=" cats all have a name thats a string"

//When Cat model is used to interact with databasem it will only interact with collectin that shares name -- cats collection
//model will have upppercase and be singular, 
//collection will have lowercase and be plural
//^^^^User --- users ( Model ---collections)

//to make a new cat/instance to modeland how:
//const kitty = new Cat({ name: 'Ironhack cat' });       it's like creating a class
//newCatToCreate.save();      to save what we create.       new "Cat" matches const Cat line 34 & {name:string} need to match schema


//to delete:
//Cat.findOneAndDelete({}) takes the object/query and takes the first and deletes itfrom db
//to edit:
//cat.findOneandUpdate({}) ..1 willl find first 1 .. 2nd parameter will edit 