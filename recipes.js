const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const data = require('./data.js')

mongoose.connect('mongodb://localhost/recipeApp')
  .then(() => {
    console.log('Connected to Mongo!')
  }).catch(err => {
    console.error('Error connecting to mongo', err)
  });

const recipeSchema = new Schema({
  title: {type: String, required: true, unique:true},
  level: {type: String, enum: ['Easy Peasy', 'Amateur Chef', 'UltraPro Chef']},
  ingredients:{type:[String]},
  cousine: {type: String},
  dishType: {type: String, enum: ['Breakfast','Dish','Snack','Drink','Dessert','Other']},
  image: {type: String, default: 'https://images.media-allrecipes.com/images/75131.jpg'},
  duration: {type: Number, min: 0},
  creator: {type: String},
  created: {type: Date, default: Date.now}
});

var Recipe = mongoose.model('Recipe',recipeSchema);

Recipe.create({title:'Pizza de peperoni', level: 'Amateur Chef', ingredients: 'Sauce Cheese Peperoni',
cousine: 'Open the paste, put the suace, put the cheese, put the peperonni and Wave until is done', dishType:'Dish', image: 'https://www.cicis.com/media/1138/pizza_trad_pepperoni.png',
duration: 50, creator: 'El manu'}).then((rec) => { console.log('The Recipe is saved and its title is: ', rec.title) })
.catch((err) => { console.log('An error happened:', err) });


Recipe.insertMany(data).then((rec) => { console.log('Many saved');
Recipe.updateOne({ title: "Rigatoni alla Genovese"}, { duration: 100 })
.then(()=>{console.log("success on update: ");
Recipe.deleteOne({title: 'Carrot Cake'})
.then((del) => { 
  console.log('Deleted register: ', del);
mongoose.connection.close()} )
.catch((err) => { console.log('An error happened:', err) });
})
.catch((err) => { console.log('An error happened:', err) });
})
.catch((err) => { console.log('An error happened:', err) });




