const Recipe = require("../models/Recipe");
const data = require('../data.js');  // Import of the data from './data.js'

//export each function as a property for the routes
exports.home = async (req, res) => { 
    const recipes = await Recipe.find();
    res.render("index", { recipes });
};

exports.createRecipe = (req, res) => {
    // pelusa
    Recipe.create(      {
        title: 'Tlalpeño Broth',
        level: 'UltraPro Chef',
        ingredients: ['3 pounds chicken breast, cut into small pieces', 'rice',  '1 tablespoon freshly ground black pepper', '1 tablespoon kosher salt, or more to taste', '2 pounds of cheese', '1 chipotle chilli', '1/4 teaspoon cayenne pepper'],
        cuisine: 'Mexican',
        dishType: 'Dish',
        image: 'https://images.media-allrecipes.com/userphotos/720x405/2280918.jpg',
        duration: 160,
        creator: 'Chef Ed'
      });
    res.redirect("/");
  };

exports.createRecipes = async (req, res) => {
    await Recipe.insertMany(data, (error) => {console.log(error)});
    res.redirect('/');
}

exports.updateRecipe = async (req, res) => {
    await Recipe.updateOne({title:'Rigatoni alla Genovese'},{duration:100})
    console.log("Success")
    res.redirect('/');
}

exports.deleteRecipe = async (req, res) => {
    await Recipe.deleteOne({title:'Carrot Cake'})
    console.log("Success")
    res.redirect('/');
}




