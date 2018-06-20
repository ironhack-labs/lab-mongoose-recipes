const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const data = require('./data.js');

mongoose.connect('mongodb://localhost/recipeApp')
  .then(() => {
    console.log('Connected to Mongo!');
  }).catch(err => {
    console.error('Error connecting to mongo', err);
  });

const recipeSchema = new Schema ({
  title: {type: String, required: true, unique: true},
  level: {type:String, enum:['Easy Peasy', 'Amateur Chef', 'UltraPro Chef']},
  ingredients: {type: Array},
  cousine: {type:String, required: true},
  dishType: {type:String},
  image: {type: String, default: 'https://images.media-allrecipes.com/images/75131.jpg'},
  duration: {type:Number, min: 0},
  creator: {type: String},
  created: {type: Date, default: Date.now}
});

const Recipe = mongoose.model('Recipe', recipeSchema);

Recipe.create({  
  title: 'Portobello Mushroom Burger',
  level: 'Amateur Chef',
  ingredients: ['Mushroom Cap', 'Oregano', 'Olive Oil', 'Salt'],
  cousine: 'vegan',
  dishType: 'lunch',
  image: 'https://images.media-allrecipes.com/userphotos/720x405/403928.jpg',
  duration: 35,
  creator: 'Bob Cody',
  // created: {'2016-08-25'}
})
  .then((recipe)=>{console.log('The recipe saved!, the title is:', recipe.title)})
  .catch((err) => {console.log('An error happened:' , err)})

Recipe.insertMany(data)
.then((recipe) =>{
  recipe.forEach(element => {
    console.log('The recipe has been added from the array, and its title is:', element.title);
  });
});

Recipe.updateOne(
  { title: 'Rigatoni alla Genovese' }, 
  { duration: 100 })
.then(recipe => {
  console.log('Success, recipe updated ;)!')
})
.catch(err => {
  console.log('An error happened:', err);
});

Recipe.deleteOne({title: 'Carrot Cake'})
.then(recipe => {
  console.log('Success, recipe removed :O!')
})
.catch(err => {
  console.log('An error happened:', err);
});

setTimeout(()=>{
  mongoose.connection.close()
  console.log('Done:Closed')
}, 5000)