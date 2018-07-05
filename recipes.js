const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const data = require('./data.js')


const recipeSchema = new Schema({
  title : {type: String, required: true, unique: true},
  level: {type: String, enum: ['Easy Peasy', 'Amateur Chef', 'UltraPro Chef']},
  ingredients : [String],
  cousine: {type: String, required: true},
  dishType: {type: String, enum: ['Breakfast', 'Dish', 'Snack', 'Drink', 'Dessert', 'Other']},
  image: {type: String, default: 'https://images.media-allrecipes.com/images/75131.jpg.'},
  duration: {type: Number, min: 0},
  creator: {type: String},
  created: {type: Date, default: Date.now},
});


const Recipe = mongoose.model('Recipe', recipeSchema);

mongoose.connect('mongodb://localhost/recipeApp')
  .then(() => {
    console.log('Connected to Mongo!')
    mongoose.connection.close();

  }).catch(err => {
    console.error('Error connecting to mongo', err)
  });


  const recipe = new Recipe({
    title: 'Easy Thai Red Curry',
    level: 'Amateur Chef',
    ingredients: [
      '1 1/2 cups basmati rice',
      '1 tablespoon canola oil',
      '1 1/2 pounds boneless, skinless chicken breasts, cut into 1-inch chunks',
      'Kosher salt and freshly ground black pepper',
      '2 shallots, minced',
      '3 cloves garlic, minced',
      '3 tablespoons red curry paste',
      '1 tablespoon freshly grated ginger',
      '1 (13.5-ounce) can coconut milk',
      '1 bunch broccolini, cut into 3-inch pieces',
      '2 green onions, thinly sliced',
      '3 tablespoons chopped fresh cilantro leaves',
      '2 tablespoons freshly squeezed lime juice',
    ],
    cousine: 'Thai',
    dishType: 'Dish',
    image: "https://s23209.pcdn.co/wp-content/uploads/2018/02/Easy-Thai-Red-CurryIMG_3048.jpg",
    duration: 40 + 'mins',
    creator: 'Kathryne',
    created: Date('10/20/2015'),
  });

recipe.save()
  .then((reponse)=>{
      console.log(response);
  })
  .catch((error)=>{
      console.log(error);
  })
  
Recipe.insertMany(data)
.then((docs)=>{
  console.log(docs);
})
.catch((error)=>{
  console.log(error);
})


Recipe.updateOne({ title: "Rigatoni alla Genovese"}, { duration: 100 }) //updating the duration field to 100 min
.then((response)=>{
     console.log("You did it!");
  })
.catch((error)=>{
     console.log(error);
  });


Recipe.deleteOne({name: 'Carrot Cake'})
.then((response)=>{
    console.log('Success! Carrot Cake has been removed');
})
.catch((err)=>{
    console.log(err);
})

