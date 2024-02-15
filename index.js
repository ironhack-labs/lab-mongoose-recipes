require('dotenv').config();

const mongoose = require('mongoose');
mongoose.set('strictQuery', false);

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data/data.json');

const MONGODB_URI = 'mongodb://127.0.0.1:27017/recipe-app';

//Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then(x => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany();
  })
  .then(() => {
    return Recipe.create({
      "title": "Chocolinas Cake",
      "level": "Amateur Chef",
      "ingredients": [
        "3 packs of Chocolinas Coockies",
        "50gr Butter",
        "2 cups of Milk",
        "1/4 cup of Coffe",
        "500gr of Dulce De Leche",
        "250rg Cream Cheese"
      ],
      "cuisine": "Argentina",
      "dishType": "dessert",
      "duration": 40,
      "creator": "Chef Lucas"
    });
  })
  .then((name) => {
    console.debug(`Iteration 2: you just create the recipi ${name.title}.`)
  })
  .then(() => {
    return Recipe.insertMany(data);
  })
  .then((recipes) => {
    console.debug(`Iteration 3:`)
    recipes.forEach((recipeTitle) => console.debug(`·${recipeTitle.title}`))
  })
  .then(() => {
    return Recipe.findOneAndUpdate({"title": "Rigatoni alla Genovese"}, {$set: { "duration": 100 }}, {new: true})
  })
  .then((result) => {
    console.debug(`Iteration 4: the ${result.title} duration was updated from 220 to ${result.duration}.`)
  })
  .then(() => {
    return Recipe.deleteOne({"title": "Carrot Cake"})
  })
  .then((result) => {
    console.debug(`Iteration 5: we delet ${result.deletedCount} recipe from the data of recipes.`)
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  })
  .finally(() => {
    mongoose.connection.close()
      .then(() => {
        console.debug(`Iteration 6: disconect from mongoose succesfully, see you soon!`)
      })
      .catch((error) => console.error('Error disconnecting of the database', error))
  })

/*
async function mongoLab() {
  try {
    const conectMongoose = await mongoose.connect(MONGODB_URI);
    console.debug(`Connected to the database: "${conectMongoose.connection.name}"`);

    await Recipe.deleteMany();

    const myCake = await Recipe.create({
        "title": "Chocolinas Cake",
        "level": "Amateur Chef",
        "ingredients": [
          "3 packs of Chocolinas Coockies",
          "50gr Butter",
          "2 cups of Milk",
          "1/4 cup of Coffe",
          "500gr of Dulce De Leche",
          "250rg Cream Cheese"
        ],
        "cuisine": "Argentina",
        "dishType": "dessert",
        "duration": 40,
        "creator": "Chef Lucas"
      });
    console.debug(`Iteration 2: you just create the recipi ${myCake.title}.`)

    const loadData = await Recipe.insertMany(data);
    console.debug(`Iteration 3: `);
    loadData.forEach((recipeTitle) => console.debug(`·${recipeTitle.title}`));
    
    const updateOneRecipe = await Recipe.findOneAndUpdate({"title": "Rigatoni alla Genovese"}, {$set: { "duration": 100 }}, {new: true});
    console.debug(`Iteration 4: the ${updateOneRecipe.title} duration was updated from 220 to ${updateOneRecipe.duration}.`);

    const deleteOne = await Recipe.deleteOne({"title": "Carrot Cake"});
    console.debug(`Iteration 5: we delet ${deleteOne.deletedCount} recipe from the data of recipes.`);      
  } catch (error) {
    console.error('Error connecting to the database', error);
  } finally {
    mongoose.connection.close()
      .then(() => {
        console.debug(`Iteration 6: disconect from mongoose succesfully, see you soon!`)
      })
      .catch((error) => console.error('Error Disconnecting of the database', error))
  }
}

mongoLab();
*/