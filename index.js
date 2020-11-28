const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(self => {
    console.log(`Connected to the database: "${self.connection.name}"`);
    // Before adding any documents to the database, let's delete all previous entries
    return self.connection.dropDatabase();
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made
   
    const NewSchema = mongoose.Schema;
    const newRecipe = new NewSchema(
      {
        // TODO: write the schema
        title:{ 
          type: String,
          required: true, // validación
          unique: true,},
        level : {
          type: String,
          enum: ['Easy Peasy','Amateur Chef','UltraPro Chef']
        },
        ingredients: {
          type: [String]},
        cuisine: {
          type: String},
        dishType: {
          type: String,
          enum: ['main_course','dessert']
        },
        image: {
          type: String,
          default: 'https://images.media-allrecipes.com/images/75131.jpg'
        },
        duration: {
          type: Number,
          min: 0
        },
        creator: {
          type: String},
        created: {
          type: Date,
          default: ''
        }
      }
      )
    const RecipeAdd = mongoose.model('RecipeAdd', newRecipe);
    module.exports = RecipeAdd;
    const receta = {
        "title": "Fondant au chocolat",
        "level": "Amateur Chef",
        "ingredients": [
          "220g dark chocolate",
          "200g butter",
          "100g white sugar",
          "5 eggs",
          "1 level tbsp flour",
          "A little butter for the mould"
        ],
        "cuisine": "French",
        "dishType": "dessert",
        "image": "https://cdn.cnn.com/cnnnext/dam/assets/181127111211-24-50-sweets-travel-gateau-fondant-au-chocolat.jpg",
        "duration": 40,
        "creator": "Michel Bras"
      }
    RecipeAdd.create(receta, (error, recipeadd) => {
      if(error){
        console.log('An error happened', error)
        return;
      }
      console.log('The title is: ', recipeadd.title )
    })

   
  })
  .then(() =>{
    Recipe.insertMany(data).then(() =>{
      console.log(`Title recipes: ${title}`)
    }).catch((err) => {
      console.log(err)
      }
     
    )  
  }).then(() => {

    data.findByIdAndUpdate({"5fc16df6e0d23d13905548be"},
    {
      duration : 100
  },
  {
      new: true // actualiza el nombre
  
  }).then((data) =>{
    if(data === null){
        throw new Error('Title Not Found');
    }
    res.json({ message: 'Duration updated!' })
    console.log("New Duration", data);
})

})
  .catch(error => {
    console.error('Error connecting to the database', error);
  });
