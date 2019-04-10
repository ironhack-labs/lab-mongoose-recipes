const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const data = require('./data.js');

mongoose.connect('mongodb://localhost/recipeApp')
  .then(() => {
    console.log('Connected to Mongo!');
  }).catch(err => {
    console.error('Error connecting to mongo', err);
  });

  const foodSchema = new Schema({
   title: { type: String, required: true, unique:true },
   level: { type: String, enum: ["Easy Peasy", "Amateur Chef", "UltraPro Chef"] },
   ingredients: {type: Array},
   cuisine: { type: String, required: true},
   dishType: { type: String, enum: [ "Breakfast" , "Dish" , "Snack" , "Drink" , "Dessert" , "Other"] },
   image: { type: String, default: 'https://images.media-allrecipes.com/images/75131.jpg' },
   duration: { type: Number, min: 0 },
   creator: {type: String},
   created: {type: Date, default: Date.now},
   }); 

  const FoodBuilder = mongoose.model('data', foodSchema);
        module.exports = FoodBuilder; 

  let promise1 = FoodBuilder.create({ title: 'Carrot Cake', level: 'Easy Peasy', cuisine:'Inglish'});

  FoodBuilder.create({ title: 'Rigatoni alla Genovese', level: 'Easy Peasy', cuisine:'Sapnish'});
    // .then(food => { console.log('The user is saved and its value is: ', food) })
    // .catch(err => { console.log('An error happened:', err) });   
  
  const food = Array(10)
    .fill(0)
    .map((x, idx) => ({
        title: "Dish " + idx,
        duration: Math.round(Math.random() * 30 + 1),
        cuisine: 'Italian'
    })); 


  let promise2 = FoodBuilder.insertMany(food);
    // .then((success) => {
    //     console.log(success);
    // })
    // .catch((err) => {
    //     console.log(err);
    // });

  let promise3 = FoodBuilder.updateOne({ title: "Rigatoni alla Genovese"}, { duration: 100 , cuisine: "Italian"});
    // .then(() => { console.log('Update Ok')})
    // .catch(err => { console.log('An error happened:', err) });  

  let promise4 = FoodBuilder.deleteOne({ title: "Carrot Cake"});
    // .then(() => { console.log('delete Ok')})
    // .catch(err => { console.log('An error happened:', err) });  

  Promise.all([promise1, promise2, promise3, promise4])
  .then(values => { 
    console.log("all has been changed");
    console.log(values);

    mongoose.connection.close();
    console.log("close ok");
  })
  .catch(err => console.error(err));