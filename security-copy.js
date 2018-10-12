const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const data = require('./data.js');

mongoose.connect('mongodb://localhost/recipeApp')
  .then(() => {
    console.log('Connected to Mongo!');
  }).catch(err => {
    console.error('Error connecting to mongo', err);

  });

const recipieSchema = new Schema ({
  title: String,
  level: { type: String, enum : ['Easy Peasy', 'Amateur Chef', 'UltraPro Chef']},
  ingredients: [],
  cuisine: String,
  dishType: { type: String, enum : ['Breakfast', 'Dish', 'Snack', 'Drink', 'Dessert', 'Other']},
  image: { type: String, default:'https://images.media-allrecipes.com/images/75131.jpg' },
  duration: { type: Number, min: 0},
  creator: String,
  created: { type: Date, default: Date.now },
});

const Recipie = mongoose.model('Recipie', recipieSchema);



const newRecipie = new Recipie({
  title: 'Alcachofas con Jamon',
})

newRecipie.save()
  .then((result) =>{
    Recipie.find()
    .then((found) =>{
      console.log(found);
    })
    .catch((error) =>{
      console.log(error);
    })
})
.catch((error) => {
  console.log('saving error', error);
})

Recipie.insertMany(data)
 .then((result) =>{
  Recipie.find()
    .then((found) =>{
      found.forEach((item)=>{
        console.log(item.title);
        
      })
    })
    .catch((error) =>{
      console.log(error);
    })
  })
 .catch((error) => {
  console.log('saving error', error);
  });


Recipie.findById(("5bc07937a068d21086ff7331"))
  .then((result) => {
    result.duration = 100;
    result.save()
    .then((updated) => {
      console.log('success',updated);
    })
    .catch((error) =>{
      console.log(error);
    })
  .catch((error) =>{
      console.log(error);
    })
  })

  Recipie.deleteOne({_id: "5bc07937a068d21086ff7330"})
  .then((result) => {
    mongoose.disconnect()
    .then(()=>{
    console.log('se ha borrado');
  })
    .catch((error) =>{
      console.log(error);
    })
  })