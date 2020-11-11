const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');
const { updateMany, db } = require('./models/Recipe.model');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false        //  findOneAndUpdate ESTA DEPRECATED TENIA QUE METER ESTA OPTION EN EL .connect
  })
  .then(self => {
    console.log(`Connected to the database: "${self.connection.name}"`);
    // Before adding any documents to the database, let's delete all previous entries
    return self.connection.dropDatabase();
  })
  .then(() => {
    console.log('database vacia')
    return Recipe
      .create({ title: 'leon come gamba', level: 'UltraPro Chef', ingredients: ['salt', 'pepper', 'lemon'], cuisine: 'rare', dishType: 'other', image: 'https://www.lavanguardia.com/r/GODO/LV/p3/WebSite/2015/12/10/Recortada/img_mgonzaleza_20151210-111441_imagenes_lv_terceros_1_515de56147-kimE--572x270@LaVanguardia-Web.jpg', duration: 1, creator: 'Crazy guy' })
  })
  .then(theRecipe => console.log(theRecipe.title))
  .then(() => Recipe.insertMany(data))
  .then(theData => theData.forEach(elm => console.log(elm.title)))
  .then(() => Recipe.findOneAndUpdate({ title: "Rigatoni alla Genovese" }, { duration: 100 }, { new: true }))
  .then(updatedRecipe => console.log(`Update done! ${updatedRecipe.title} duration is now : ${updatedRecipe.duration}.`))
  .then(() => Recipe.deleteOne({ title: 'Carrot Cake' }))
  .then(deletedRecipe => console.log('Element deleted!', deletedRecipe))
  .then(() => mongoose.connection.close())
  .catch(error => {
    console.error('Error connecting to the database', error);
  });


