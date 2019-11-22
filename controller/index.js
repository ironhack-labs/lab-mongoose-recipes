const Recipe = require("../models/Recipe");
const data = require("../data")


exports.home = async (req, res ) => {
   const recipes = await Recipe.find();
   mongoose.connection.close();
   res.render("index", {recipes});
}

exports.createRecipe = (req, res) => {
   Recipe.create({
        title: 'Asian Glazed Chicken Thighs',
        level: 'Amateur Chef',
        ingredients: ['1/2 cup rice vinegar', '5 tablespoons honey', '1/3 cup soy sauce (such as Silver Swan®)', '1/4 cup Asian (toasted) sesame oil', '3 tablespoons Asian chili garlic sauce', '3 tablespoons minced garlic', 'salt to taste', '8 skinless, boneless chicken thighs'],
        cuisine: 'Asian',
        dishType: 'Dish',
        image: 'https://images.media-allrecipes.com/userphotos/720x405/815964.jpg',
        duration: 40,
        creator: 'Chef LePapu'
     });
    mongoose.connection.close();
   res.redirect("/");
 };

exports.createMany = async (req, res) => {
    const insertmany = await Recipe.insertMany(data);
    console.log(insertmany);
    mongoose.connection.close();
    res.redirect("/");
}
    

exports.changeDuration = async (req, res) => {
    await Recipe.findByIdAndUpdate("5dccc0dd895b7d3ccff36dd1", {duration: 100})
    mongoose.connection.close();
    res.redirect("/");
}

exports.deleteRecipe = async (req, res) => {
    await Recipe.findByIdAndDelete("5dccc0967f51963c116087f6")
    mongoose.connection.close();
    res.redirect("/");
}