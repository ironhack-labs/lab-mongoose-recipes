const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI, {
    useFindAndModify: false,
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })

  .then(self => {
    console.log(`Connected to the database: "${self.connection.name}"`);
    // Before adding any documents to the database, let's delete all previous entries
    return self.connection.dropDatabase();
  })

  // ----------------------------ÚLIMA FORMA---------------------------------- //

  .then(() => {
    Recipe.create({
      title: 'Lentejas', level: 'Easy Peasy', ingredients: ['lentejas', 'agua', 'verduras', 'laurel', 'vino tinto'],
      cuisine: 'Spanish', dishType: 'main_course', duration: 60, creator: 'Moncho the Chef'
    })
      .then(newRecipe => console.log('se ha creado la receta:', newRecipe.title))
      .then(() => Recipe.insertMany(data))
      .then(eachRecipe => eachRecipe.forEach(element => console.log('Las nuevas recetas son:', element.title)))
      .then(() => Recipe.findOneAndUpdate({ title: 'Rigatoni alla Genovese' }, { duration: 100 }, { new: true }))
      .then(newDuration => console.log(`La duración de la receta '${newDuration.title}' ha sido correctamente modificada a ${newDuration.duration} mins`))
      .then(() => Recipe.deleteOne({ title: 'Carrot Cake' }))
      .then(deletedRecipe => console.log(`Se ha eliminado correctamente ${deletedRecipe.deletedCount} documento`))
      .then(() => mongoose.connection.close())
  })
  .catch(error => console.error('Error connecting to the database', error));

// ----------------------------SEGUNDA FORMA---------------------------------- //

  // .then(() => {
  //   //Run your code here, after you have insured that the connection was made
  //   return Recipe.create({
  //     title: 'Lentejas', level: 'Easy Peasy', ingredients: ['lentejas', 'agua', 'verduras', 'laurel', 'vino tinto'],
  //     cuisine: 'Spanish', dishType: 'main_course', duration: 60, creator: 'Moncho the Chef'
  //   })
  // })

  // .then(newRecipe => {
  //   console.log('se ha creado la receta:', newRecipe.title)
  //   return Recipe.insertMany(data)
  // })

  // .then(eachRecipe => {
  //   eachRecipe.forEach(element => console.log('las nuevas recetas son:', element.title))
  //   return Recipe.findOneAndUpdate({ title: 'Rigatoni alla Genovese' }, { duration: 100 }, { new: true })
  // })

  // .then(newDuration => {
  //   console.log(`La duración de la receta ${newDuration.title} ha sido correctamente modificada a ${newDuration.duration} mins`)
  //   return Recipe.deleteOne({ title: 'Carrot Cake' })
  // })

  // .then(deletedRecipe => {
  //   if (deletedRecipe.ok === 1) {
  //     console.log(`Se ha eliminado correctamente ${deletedRecipe.deletedCount} documento`)
  //   } else {
  //     console.log('No se ha podido eliminar el documento', deletedRecipe.ok)
  //   }
  //   return mongoose.connection.close()
  // })

  // .catch(error => {
  //   console.error('Error connecting to the database', error);
  // });

  // ----------------------------PRIMERA FORMA---------------------------------- //

  // .then(() => {
  //   //Run your code here, after you have insured that the connection was made
  //   Recipe.create({
  //     title: 'Lentejas', level: 'Easy Peasy', ingredients: ['lentejas', 'agua', 'verduras', 'laurel', 'vino tinto'],
  //     cuisine: 'Spanish', dishType: 'main_course', duration: 60, creator: 'Moncho the Chef'
  //   })
  //     .then(newRecipe => {
  //       console.log('se ha creado la receta:', newRecipe.title)
  //       Recipe.insertMany(data)
  //         .then(eachRecipe => {
  //           eachRecipe.forEach(element => console.log('las nuevas recetas son:', element.title))
  //           Recipe.findOneAndUpdate({ title: 'Rigatoni alla Genovese' }, { duration: 100 }, { new: true })
  //             .then(newDuration => {
  //               console.log(`La duración de la receta ${newDuration.title} ha sido correctamente modificada a ${newDuration.duration} mins`)
  //               Recipe.deleteOne({ title: 'Carrot Cake' })
  //                 .then(deletedRecipe => {
  //                   if (deletedRecipe.ok === 1) {
  //                     console.log(`Se ha eliminado correctamente ${deletedRecipe.deletedCount} documento`)
  //                   } else {
  //                     console.log('No se ha podido eliminar el documento', deletedRecipe.ok)
  //                   }
  //                   mongoose.connection.close()
  //                 })
  //             })
  //         })
  //     })
  // })
  // .catch(error => {
  //   console.error('Error connecting to the database', error);
  // });

