const mongoose = require('mongoose');
const Recipe = require('./recipes.js');
const Data = require('./data.js')
mongoose.connect('mongodb://localhost/recipeApp')





// Recipe.create([{
//     title: 'Rigatoni alla Genovese',
//     level: 'Easy Peasy',
//     ingredients: ['2 pounds red onions, sliced salt to taste', '2 (16 ounce) boxes uncooked rigatoni', '1 tablespoon chopped fresh marjoram leaves', '1 pinch cayenne pepper', '2 tablespoons freshly grated Parmigiano-Reggiano cheese'],
//     cuisine: 'Italian',
//     dishType: ['Dish'],
//     image: 'https://images.media-allrecipes.com/userphotos/720x405/3489951.jpg',
//     duration: 220,
//     creator: 'Chef Luigi'
//   },
//   {
//     title: 'Chocolate Chip Cookies',
//     level: 'Amateur Chef',
//     ingredients: ['1/2 cup light brown sugar', '1 large egg', '2 tablespoons milk', '1 1/4 teaspoons vanilla extract', '2 cups semisweet chocolate chips'],
//     cuisine: 'French',
//     dishType: ['Dish'],
//     image: 'https://images.media-allrecipes.com/userphotos/720x405/815964.jpg',
//     duration: 30,
//     creator: 'Chef Jennifer'
//   } ])
//   .then((recipe)=>{
//         console.log(recipe.title);
//     })
//   .catch((err)=>{
//         console.log(err);
//     })


// // Recipe.insertMany(Data)
// // .then((recipe)=>{

// // })
// .catch((err)=>{
//     console.log(err)
// // })
// Recipe.updateOne({duration: 220}, {duration: 100})
// .then((blah)=>{
//         console.log(blah)
//     })
//     .catch((err)=>{
//         console.log(err);
//     })

// Recipe.find({name: ""})


Recipe.findOneAndRemove({title: "Carrot Cake"})
.then((recipe)=>{
    console.log(recipe)
    // mongoose.disconnect()
})
.catch((err)=>{
    console.log(err)
})









// mongoose.connect('mongodb://localhost/recipeApp')
//   .then(() => {
//     console.log('Connected to Mongo!');
//   }).catch(err => {
//     console.error('Error connecting to mongo', err);
//   });
