const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app"

async function getRecipes(){
    try {
        await mongoose
        .connect(MONGODB_URI, {
          useCreateIndex: true,
          useNewUrlParser: true,
          useUnifiedTopology: true
        });

        await mongoose.connection.db.dropDatabase();
        console.log('Database dropped:', MONGODB_URI );

        const newRecipe = {
            title: "Strawberry Mousse",
            level: "Easy Peasy", 
            ingredients: ["Condensed milk", "Milk powder", "Strawberry essence", "Gelatin", "Heavy cream"],
            cuisine:  "Brazilian",
            dishType: "Desserts",
            duration: 10, 
            creator: "Anne",
        };

        //Create
        const createdRecipe = await Recipe.create(newRecipe);

        const insertData = await Recipe.insertMany(data);

        const recipeToUpdate = await Recipe.findOneAndUpdate( { title: "Rigatoni alla Genovese"}, { duration: 100 } );

        console.log("Recipe was updated:", recipeToUpdate);

        const recipeToDelete = await Recipe.deleteOne( {title: "Carrot Cake"} );

        await mongoose.connection.close();
        console.log("Connection closed!");


    } catch (error) {
        console.log(error);
    }

}

getRecipes();
