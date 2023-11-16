const mongoose = require('mongoose');
const Recipe = require('./models/Recipe.model');
const data = require('./data');

const MONGODB_URI = 'mongodb://127.0.0.1:27017/recipe-app';

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log(`Connected to the database: "${mongoose.connection.name}"`);

    
    return Recipe.deleteMany();
  })
  .then(() => {
   
    return Recipe.create({
      title: "Rigatoni alla Genovese",
      level: "Easy Peasy",
      ingredients: [
        "2 pounds red onions, sliced salt to taste",
        "2 (16 ounce) boxes uncooked rigatoni",
        "1 tablespoon chopped fresh marjoram leaves",
        "1 pinch cayenne pepper",
        "2 tablespoons freshly grated Parmigiano-Reggiano cheese"
      ],
      cuisine: "Italian",
      dishType: "main_course",
      image: "https://images.media-allrecipes.com/userphotos/720x405/3489951.jpg",
      duration: 220,
      creator: "Chef Luigi",
      created: Date.now()
    });
  })
  .then((createdRecipe) => {
    console.log('Recipe "Rigatoni alla Genovese" created successfully.', createdRecipe);

   
    return Recipe.insertMany(data);
  })
  .then((insertedData) => {
    console.log('Inserted data:', insertedData);

    return Recipe.findOneAndUpdate({ title: "Rigatoni alla Genovese" }, { duration: 210 }, { new: true });
  })
  .then((updatedRecipe) => {
    console.log("Updated Recipe:", updatedRecipe);

    return Recipe.deleteOne({ title: 'Carrot Cake' });
  })
  .then(() => {
    console.log("Carrot Cake deleted");
  })
  .catch(error => {
    console.error('Error connecting to the database or performing operations', error);
  });
