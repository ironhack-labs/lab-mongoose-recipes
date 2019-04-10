const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const data = require('./data.js');



const recipeSchema = new Schema({
  title: { type: String, required: true, unique: true },
  level: { type: String, enum: ['Easy Peasy', 'Amateur Chef', 'UltraPro Chef'] },
  ingredients: { type: Array },
  cuisine: { type: String, required: true },
  dishType: { type: String, enum: ['Breakfast', 'Dish', 'Snack', 'Drink', 'Dessert', 'Other'] },
  image: { type: String, default: 'https://ironhack.slack.com/archives/DHFRP7AEB/p1554906997000200' },
  duration: { type: Number, min: 0 },
  creator: { type: String },
  created: { type: Date, default: Date.now() }
});

const recipeBuilder = mongoose.model('Recipe', recipeSchema);
mongoose.connect('mongodb://localhost/recipeApp')

  .then(() => {

    console.log('Connected to Mongo!');

    // *************************************************************

    // recipeBuilder.create({
    //   title: 'Iron drink',
    //   level: 'Easy Peasy',
    //   ingredients: ['Levadura', 'Agua', 'Gin', 'Tónica'],
    //   cuisine: 'Spanish',
    //   dishType: 'Drink',
    //   duration: 1,
    //   creator: 'Anthony & Charlie',
    // })
    // .then(recipe => { console.log(recipe.title)})
    // .catch(err => { console.log(err)} )

    // * Otra metodo para crear nuevo valor *************

    // const newRecipe = new recipeBuilder({ 
    //   title: 'Iron drink',
    //   level: 'Easy Peasy',
    //   ingredients: ['Levadura', 'Agua', 'Gin', 'Tónica'],
    //   cuisine: 'Spanish',
    //   dishType: 'Drink',
    //   duration: 1,
    //   creator: 'Anthony & Charlie',
    // });

    // newRecipe.save((err) => {
    //   if (err) {
    //     console.log(err);
    //   } else {
    //     console.log(newRecipe.title);
    //   }
    // });


    // *************************************************************


    // recipeBuilder.insertMany(data)
    //   .then((sucess) => {
    //     data.forEach(x =>{
    //       console.log(x.title);
    //     })
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   })

    // *************************************************************

    // recipeBuilder.updateOne({title: "Rigatoni alla Genovese"}, {duration:100})
    // .then(console.log("Sucess!"))
    // .catch(console.log("Error, not updated"));

    // *************************************************************

    // recipeBuilder.deleteOne({title: "Carrot Cake"})
    //     .then((sucess) => {
    //       console.log("Deleted!")
    //     })
    // .catch((err) => {
    //   console.log("Not deleted!")
    // })

    // *************************************************************

    // If the Node process ends, close the Mongoose connection 
      mongoose.connection.close(() => {
        console.log('Database closed');
        process.exit(0);
      });

  }).catch(err => {
    console.error('Error connecting to mongo', err);
  });

