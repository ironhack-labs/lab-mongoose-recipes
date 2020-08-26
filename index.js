const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
    .connect(MONGODB_URI, {
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    })
    .then(self => {
        console.log(`Connected to the database: "${self.connection.name}"`);
        // Before adding any documents to the database, let's delete all previous entries
        return self.connection.dropDatabase();
    })
    .then(async() => {

        // Iteration 2:
        await addRecipe({
            title: "Galette bretonne complète",
            level: "Easy Peasy",
            ingredients: ["Integral wheat flour", "Salt", "Egg", "Butter", "Ham", "Cheese", "Mushrooms", "Pepper"],
            cuisine: "French",
            dishType: "main_course",
            image: "https://larecette.net/wp-content/uploads/2019/01/galettes-bretonnes-6-1200x900.jpg",
            duration: 30,
            creator: "Mr. Sarasin",
        });

        // Iteration 3:
        await addManyRecipes(data);

        // Iteration 4:
        await updateRecipe({
            title: "Rigatoni alla Genovese"
        }, {
            duration: 100
        });

        // Iteration 5:
        await deleteRecipe("Carrot Cake");
    })
    // Iteration 6:
    .then(disconnectDB)
    .catch(error => {
        console.error('Error connecting to the database', error);
    })


// Iteration 2:
async function addRecipe(obj) {
    const newRecipe = await Recipe.create(obj);
    console.log(newRecipe.title, "has successfully been added to the database.");
}

// Iteration 3:
async function addManyRecipes(arrOfObj) {
    const dataRecipes = await Recipe.insertMany(arrOfObj);
    dataRecipes.forEach(recipe => console.log(recipe.title, "has successfully been added to the database."))
}

// Iteration 4:
async function updateRecipe(filter, update) {
    await Recipe.findOneAndUpdate(filter, update, {
        new: true
    });
    console.log(`The recipe's duration has been updated successfully.`);
}

// Iteration 5:
async function deleteRecipe(name) {
    await Recipe.deleteOne({
        title: name
    })
    console.log("The recipe has been removed successfully.")
}

// Iteration 6:
function disconnectDB() {
    mongoose.connection.close();
}