const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const data = require('./data.js');

mongoose.connect('mongodb://localhost/recipeApp')
  .then(() => {
    console.log('Connected to Mongo!')
  }).catch(err => {
    console.error('Error connecting to mongo', err)
  });
  
  const recipeSchema = new Schema({
    title: { type: String, required: true, unique: true },
    level: {
      type: String,
      enum: ['Easy Peasy','Amateur Chef' , 'UltraPro Chef'] 
    },
    ingredients: {type: Array},
    cousine: { type: String, required: true},
    dishType: {
      type: String,
      enum: ['Breakfast', 'Dish', 'Snack', 'Drink', 'Dessert', 'Other'] 
    },
    image: { type: String, default:' https://images.media-allrecipes.com/images/75131.jpg' },
    duration: { type: Number, min:0  },
    creator: { type: String},
    created: {type: Date, default: new Date()}

  });
  
  const Recipe = mongoose.model('Recipe', recipeSchema);

  // Recipe.create({
  //   title: 'Pizza', level: 'Amateur Chef', cousine: 'something'
  //   })
  // .then((recipe) => { console.log('New receipt title is : ', recipe.title) })
  // .catch((err) => { console.log('An error happened:', err) });
  
  Recipe.insertMany(data)
  .then( () => {
    Recipe.updateOne({ title: "Rigatoni alla Genovese"}, { duration: 100 })
    .then( _ => {
      Recipe.remove({title:"Carrot Cake"})
      .then( _ => {
        console.log( "DONE!!!!" )
        mongoose.connection.close();
      })
    })
  })
  .catch( err => { console.log(err) } )
 