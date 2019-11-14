const Recipe = require("../models/Recipe");
const Data = require("../data");

exports.home = async (req, res ) => {
    const recipes = await Recipe.find();
    res.render("index", {recipes});
}


exports.createRecipe = (req, res) => {
    Recipe.create({
        title: 'paps',
        level: 'paps',
        ingredients: ['1/2 cup light brown sugar', '1 large egg', '2 tablespoons milk', '1 1/4 teaspoons vanilla extract', '2 cups semisweet chocolate chips'],
        cuisine: 'French',
        dishType: 'Dish',
        image: 'https://images.media-allrecipes.com/userphotos/720x405/815964.jpg',
        duration: 30,
        creator: 'Chef Jennifer'
      });
    res.redirect("/");
  }; 

exports.createMany = async(req, res) => {
    await Recipe.insertMany(Data, function(error, docs) {});
    res.redirect("/");
  };

exports.changeDuration = async (req, res) => {
    await Recipe.findByIdAndUpdate("5dccc0dc830beb66594a6306", { duration: 100 });
    res.redirect("/");
  };

exports.deleteRecipe = async (req, res) => {
    await Recipe.findByIdAndDelete("5dccc0bdf6200b6628177f88");
    res.redirect("/");
  };
