const Recipe = require("./Recipe.model");

const recipeNew = {

    'title': 'Fried rice',
    'level': 'Easy Peasy', 
    'ingredients': [
        'Rice 150g', 
        'Water 350ml', 
        'Olive oil', 
        'Salt', 
        '1 carrot', 
        '1 small onion',
        'leek, 1 piece',
        'Soy sauce, 3 tablespoons' ],
    'cusini': 'Asian',
    'dishType': 'main_course',
    'image': '/images/rice.jpg',
    'duration': 40,
    'creator': ' Cheff Roxana',
}


/*Recipe.create(recipeNew, (err, recipe) => {
    if(err) {
        console.log('An err happened:', err);
        return;
    }
    console.log('the recipe is saved and its value is: ', recipe);
});
*/

Recipe.create(recipeNew)
.then(recipe => console.log('The recipe is  saved and its value is:', recipe))
.catch(err => console.log('An err happened while saving a new recipe:', err))
