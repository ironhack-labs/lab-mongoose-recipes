const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const data = require('./data.js')

mongoose.connect('mongodb://localhost:27017/recipeApp', { useNewUrlParser: true })
  .then(() => {
    console.log('Connected to Mongo!')
    createRecipe()
      .then((recipe)=>{
        console.log(recipe.title);
      });
    insertManyRecipes()
      .then((data)=>{
        data.forEach((e)=>console.log(e.title));
        console.log('updated rigatoni')
        updateRigatoni()
          .then(()=>{
            console.log('deleted carrot')
            deleteCarrot()
              .then(()=>{
                console.log('disconnecting db')
                mongoose.disconnect();
              })
          })
      })
  })
  .catch(err => {
    console.error('Error connecting to mongo', err)
  });

const recipeSchema = new Schema({
  title: String,
  level: String,
  ingredients: [String],
  cousine: { type: String, required: true},
  dishType:{ type: String, enum: ['Breakfast', 'Dish', 'Snack', 'Drink', 'Dessert', 'Other']},
  image: {type: String, default: 'https://images.media-allrecipes.com/images/75131.jpg'},
  duration: {type: Number, min: 0},
  creator: String,
  created: {type: Date, default: Date.now}
})

const Recipe = mongoose.model('Recipe', recipeSchema);

const createRecipe = ()=> {
  return Recipe.create({
  title: 'Burger Cangreburger',
  cousine: 'Hamburgers'
})
};

const insertManyRecipes = () => {
  return Recipe.insertMany(data)
}

const updateRigatoni = () => {
  return Recipe.updateOne({ title: "Rigatoni alla Genovese"}, { duration: 100 })
}

const deleteCarrot = ()=>{
  return Recipe.deleteOne({ title: "Carrot Cake"})
}

