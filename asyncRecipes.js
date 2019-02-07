const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const data = require('./data.js');

//It 1
const mySchema = new Schema({
  title: String,
  level: {
    type: String, 
    enum: ["Easy Peasy", 'Amateur Chef', 'UltraPro Chef']
  },
  ingredients: Array,
  cuisine: { 
    type: String, 
    required: true 
  },
  dishType: {
    type: String,
    enum: ["Breakfast", "Dish", "Snack", "Drink", "Dessert", "Other"]
  },
  image: {
    type: String,
    default:  'https://images.media-allrecipes.com/images/75131.jpg'
  },
  duration: {
    type: Number,
    min: 0,
  },
  creator: String,
  created: {
    type: Date, 
    default: Date.now
  }
});

const Recipe = mongoose.model('Recipe', mySchema);

async function dbOperations() {
  try{
    await mongoose.connect('mongodb://localhost/recipeApp', { useNewUrlParser: true });
    console.log('Connected to mongo!!');

    //It 2
    const recipe = await Recipe.create (
      {
        title: 'White rice',
        level: 'Amateur Chef',
        ingredients: ['1/2 cup rice', '1 cup water', 'salt to taste'],
        cuisine: 'Spanish',
        dishType: ['Dish'],
        duration: 10,
        creator: 'Chef JdeJ'
      }
    );

    //It 3
    console.log(`${recipe} creada con éxito.`);
    const recipesArr = await Recipe.insertMany(data);

    //It 4
    console.log(`Total of ${recipesArr.length} documents inserted.`);
    await Recipe.updateOne({title: "Rigatoni alla Genovese"}, {duration: 100});
    
    //It 5
    console.log(`Document updated.`);
    await Recipe.deleteOne({title: "Carrot Cake"});
    console.log(`Document deleted.`);

  }catch{
    err => {
      console.error('Error connecting to mongo', err);
    }
  }finally{
    mongoose.connection.close();
  }
};

dbOperations();