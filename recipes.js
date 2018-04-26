const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const data = require('./data.js')


mongoose.connect('mongodb://localhost/recipeApp')
  .then(() => {
    console.log('Connected to Mongo!')
  }).catch(err => {
    console.error('Error connecting to mongo', err)
  });

//iteration 1
  const recipeSchema = new Schema ({
      title: {type: String, required: true, unique: true},
      level: {
        type: String,
        enum : ['Easy Peasy','Amateur Chef', 'UltraPro Chef']
    },
      ingredients: [String],
      cousine: {type: String, required: true},
      dishType: {
        type: String,
        enum : ['Breakfast','Dish', 'Snack', 'Drink', 'Dessert', 'Other'],

    },
      image: {type:String, default: "https://images.media-allrecipes.com/images/75131.jpg"},
      duration: {type: Number, min:0},
      creator: String,
      created: {type: Date, default: Date.now}

  })

  //iteration 2///
  const Recipe = mongoose.model('Recipe', recipeSchema);

  // Recipe.create({        
  // title: 'Publix Chicken Tender Sub',
  // level: 'UltraPro Chef',
  // ingredients: ['Chicken Tender', 'Bread', 'Sauce', 'Veggies'],
  // cousine: 'American',
  // dishType: ['Dish'],
  // image: '',
  // duration: 5,
  // creator: 'Publix'
  // },function(err, recipe){
  //   if(err) console.log("An error", err);
  //   else console.log("Another thing happened", recipe.title);
  // })

  ////end iteration 2


  ///iteration 3

  // Recipe.insertMany(data, function(err, recipes){
  //   if(err) console.log("An error", err);
  //   else recipes.forEach((recipe)=>{
  //     console.log("Another thing happened-->", recipe.title);
  //   });
  // })

  ///end iteration 3


    //created this to remove entire table to try again without getting unique error
  // Recipe.remove({},function(err, recipe){
  //   if(err) console.log("An error", err);
  //   else console.log("Another thing happened-->", recipe.title);
  // }) 


  //iteration 4
  // Recipe.updateOne({title: "Rigatoni alla Genovese"},{duration:100})
  //   .then(recipe =>{console.log("Duration Changed!")})
  //   .catch(theError => {console.log("the Error")});
  //end iteration 4


  //iteration 5
  //   Recipe.remove({title: "Carrot Cake"},function(err){
  //   if(err) console.log("An error", err);
  //   else console.log("Success!");
  // }) 
  //end iteration 5


//iteration 6
  mongoose.disconnect();

  //end iteration 6





  
