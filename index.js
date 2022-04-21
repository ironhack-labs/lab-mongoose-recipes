const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';



// Connection to the database "recipe-app"
mongoose
    .connect(MONGODB_URI)
    .then(x => {
        console.log(`Connected to the database: "${x.connection.name}"`);
        // Before adding any recipes to the database, let's remove all existing ones
        return Recipe.deleteMany()
    })
    .then(() => {
        const newRecipe = {
                title: 'Peanut Butter Toast',
                level: 'Easy Peasy',
                cuisine: 'Brunch',
            }
            // Run your code here, after you have insured that the connection was made
        return Recipe.create(newRecipe);
    })
    .then((newRecipe) => {
        console.log(newRecipe.title);
    })
    .catch(error => {
        console.error('Error connecting to the database', error);
    });


Recipe.insertMany(data)
    .then(recipesArray => {
        recipesArray.forEach(elm => console.log(elm.title));
    })

Recipe.findOneAndUpdate({ title: 'Rigatoni alla Genovese', duration: 100 }, { returnDocument: "after" })
    .then(() => console.log('document was updated'))
    .catch(error => console.log(error))

Recipe.deleteOne({ title: 'Carrot Cake' })
    .then(() => console.log('recipe deleted'))
    .catch(error => console.log(error))

mongoose.connection.close()
    .then(() => console.log('closing connection'))