const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const data = require('./data.js')

mongoose.connect('mongodb://localhost/recipeApp')
  .then(() => {
    console.log('Connected to Mongo!')
  }).catch(err => {
    console.error('Error connecting to mongo', err)
  });
let today = new Date();
const recipeSchema = new Schema({
  title: { type: String, required: true, unique: true },
  level: { type: String, enum: ["Easy Peasy", "Amateur Chef", "UltraPro Chef"] },
  ingredients: [],
  cousine: { type: String, require: true },
  dishType: { type: String, enum: ["Breakfast", "Dish", "Snack", "Drink", "Dessert", "Other"] },
  image: { type: String, default: "https://images.media-allrecipes.com/images/75131.jpg" },
  duration: { type: Number, min: 0 },
  creator: { type: String },
  creater: { type: Date, default: today }
})

const Recipe = mongoose.model("Recipe", recipeSchema);

Recipe.create({
  title: 'Tortilla',
  level: 'Easy Peasy',
  ingredients: ['potatos', 'eggs', 'oil', 'onion'],
  cousine: 'Spanish',
  dishType: ['Dish'],
  image: 'http://cdn1.cocina-familiar.com/recetas/thumb/tortilla-de-patata-con-cebolla.jpg',
  duration: 20,
  creator: 'Chef Alex'
})
  .then(() => {
    Recipe.find({ title: 'Tortilla' }).exec((err, obj) => {
      if (err) {
        console.log(err);
      } else {
        console.log(obj);
        Recipe.insertMany(data)
          .then(() => {
            Recipe.updateOne({ title: 'Rigatoni alla Genovese' }, { duration: 100 })
            .then(() => {
              Recipe.deleteOne({title: "Carrot Cake"})
                .then(()=> {
                  console.log("success")
                  mongoose.connection.close()
                    .then(()=>console.log("DB closed"))
                    .catch(err=>console.log(err))
                })
                .catch(err=>console.log(err))
            })
            
            .catch(err=>console.log(err))
          })
          .catch((err) => console.log(err));
        
      }
    })
  })
  .catch((err) => console.log(err));