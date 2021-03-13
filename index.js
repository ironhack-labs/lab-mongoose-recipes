const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

const newRecipe = {
  title: 'Bolo Puba 3',
  level: 'Amateur Chef',
  ingredients: [
    '1 kg de massa de puba (massa de mandioca)',
    '1 vidro (200 ml) de leite de coco',
    '1 pacote (50 g) de coco ralado',
    '1 e 1/2 xícaras (chá) de açúcar',
    '4 ovos',
    '200 g de manteiga ou margarina',
    '1 pitada de sal',
    '1 colher (sopa) de queijo parmesão ralado (opcional)'
  ],
  cuisine: 'Brasileira',
  duration: 40,
  cretor: 'Mayara Manso'
}

const insertManyRecipes = async () => {
  try {
    // const insertNewRecipe = Recipe.create(newRecipe);
    const response = await Recipe.insertMany(data);

    console.log('Finished inserting many Recipes');
    response.forEach(recipe => console.log(recipe.title));

  } catch (error) {
    console.log('deu erro aqui [insertRecipes]: ', error)
  }
}

const updateDurationRecipe = async (recipeTitle, timeDuration) => {
  try {
    const response = await Recipe.findOneAndUpdate({ title: recipeTitle },
      { $set: { duration: timeDuration } },
      { new: true, useFindAndModify: false },
    )

    console.log(`Successfully updated recipe "${response.title}" duration to ${response.duration} minutes`);
  } catch (error) {
    console.log('deu erro aqui [updateDurationRecipe]: ', error)
  }
}

const removeDurationRecipeByTitle = async (recipeTitle) => {
  try {
    const query = { title: recipeTitle };

    await Recipe.deleteOne(query);

    console.log(`${recipeTitle} deletes with success!`)
  } catch (error) {
    console.log('deu erro aqui [removeDurationRecipeByTitle]: ', error)
  }
}

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(self => {
    console.log(`Connected to the database: "${self.connection.name}"`);
    // Before adding any documents to the database, let's delete all previous entries
    return self.connection.dropDatabase();
  })
  .then(async () => {
    try {
      await insertManyRecipes();
      await updateDurationRecipe('Rigatoni alla Genovese', 100);
      await removeDurationRecipeByTitle('Carrot Cake')
      mongoose.connection.close();
    } catch (error) {
      console.log(error)
    }
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });
