const mongoose = require('mongoose'); // Poner Mongoose a funcionar

const Recipe = require('./models/recipe.model');  // Traerme el modelo de receta este documento


const data = require('./data');   // Traerme la base de datos de recetas
const dataConnectionString = 'mongodb://localhost:27017/recipe-app';   // Traerme la base de datos de recetas




  // Conexión de Mongoose a la base de datos:
mongoose
  .connect(dataConnectionString, { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true })
  .then(self => {
    console.log(`Connected to the database: "${self.connection.name}"`);
    return self.connection.dropDatabase();  // Esto vacía lo que hubiera previamente en la base de datos antes de añadir nada
  })

  .then(() => {
    Recipe.create({
      title: 'Cardamom Coffe Buns',
      level: 'Amateur Chef',
      ingredients: ["3 cups flour",
        "2 teaspoons fine sea salt",
        "1 packet active dry yeast",
        "½ cup whole milk",
        "¼ cup water",
        "8 tablespoons unsalted butter",
        "1 egg, beaten",
        "2 teaspoons ground cardamom",
        "1 cup dark brown sugar"],
      cuisine: 'American',
      dishType: 'dessert',
      image: "https://cravingsbychrissyteigen.com/wp-content/uploads/2019/11/101919_CRAVINGS_SET_2_CIARDAMOM_COFFEE_ROLLS-min-960x1200.jpg",
      duration: 40,
      creator: 'Chrissy Teigen'
    })
    
      .then(newRecipe => {
        console.log('Esta es la nueva receta:', newRecipe, 'la receta se llama:', newRecipe.title)
        return Recipe.insertMany(data)
      })

      .then(elm => {
        console.log('Estas son todas las recetas:', elm)
        return Recipe.updateOne({ title: "Rigatoni alla Genovese" }, { duration: 100 }, { new: true })
      })

      .then(det => {
        console.log('Resultado del cambio:', det, 'La recceta tiene una duración de:')
        return Recipe.deleteOne({ title: "Carrot Cake" })
      })

      .then(info => {
        console.log(info)
        return mongoose.disconnect()
      })

  })

  .catch(error => {
    console.error('Error connecting to the database', error);
  });




// INTENTÉ HACER PROMESAS ENCADENADAS PRO PERO ME DA VARIOS ERRORES:

  // .then(newRecipe => console.log('Esta es la nueva receta:', newRecipe, 'la receta se llama:', newRecipe.title))   // La nueva receta sale bien

  // .then(Recipe.insertMany(data))

  // .then(elm => console.log('Estas son todas las recetas:', elm))   // Esto me retorna 'undefined'

  // .then(Recipe.updateOne({ title: "Rigatoni alla Genovese" }, { duration: 100 }, { new: true }))

  // .then(det => console.log('Resultado del cambio:', det, 'La recceta tiene una duración de:'))   // Esto me retorna 'undefined'

  // .then(Recipe.deleteOne({ title: "Carrot Cake" }))

  // .then(info => console.log(info))   // Esto me retorna 'undefined'

  // .then(mongoose.disconnect())   // Esto me rompe todo :)








//  .then(newRecipe => {
//         console.log('Esta es la nueva receta:', newRecipe, 'la receta se llama:', newRecipe.title)
//         Recipe.insertMany(data)
//           .then(elm => {
//             console.log('Estas son todas las recetas:', elm)
//             Recipe.updateOne({ title: "Rigatoni alla Genovese" }, { duration: 100 }, { new: true })
//               .then(det => {
//                 console.log('Resultado del cambio:', det, 'La recceta tiene una duración de:')
//                 Recipe.deleteOne({ title: "Carrot Cake" })
//                   .then(info => {
//                     console.log(info)
//                     mongoose.disconnect()
//                   })
//                   .catch(err => console.log('Error al eliminar:', err))
//               })
//               .catch(err => console.log('Error actualizando los datos', err))
//           })
//           .catch(err => console.log('Error añadiendo datos a Recipes:', err))
//       })
//       .catch(err => console.log('Error creando nueva Recipe:', err))
//   })
  
  




// mongoose
// .connect(dataConnectionString, { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true })
// .then(self => {
//   console.log(`Connected to the database: "${self.connection.name}"`);
//   return self.connection.dropDatabase();  // Esto vacía lo que hubiera previamente en la base de datos antes de añadir nada
// })

// .then(() => {
//   Recipe.create({
//     title: 'Cardamom Coffe Buns',
//     level: 'Amateur Chef',
//     ingredients: ["3 cups flour",
//       "2 teaspoons fine sea salt",
//       "1 packet active dry yeast",
//       "½ cup whole milk",
//       "¼ cup water",
//       "8 tablespoons unsalted butter",
//       "1 egg, beaten",
//       "2 teaspoons ground cardamom",
//       "1 cup dark brown sugar"],
//     cuisine: 'American',
//     dishType: 'dessert',
//     image: "https://cravingsbychrissyteigen.com/wp-content/uploads/2019/11/101919_CRAVINGS_SET_2_CIARDAMOM_COFFEE_ROLLS-min-960x1200.jpg",
//     duration: 40,
//     creator: 'Chrissy Teigen'
//   })
//     .then(newRecipe => console.log('Esta es la nueva receta:', newRecipe, 'la receta se llama:', newRecipe.title))
//     .catch(err => console.log('Error creando nueva Recipe:', err))
// })

// .then(() => {
//   Recipe.insertMany(data)
//     .then(elm => console.log('Estas son todas las recetas:', elm)) // NO LOGRO ACCEDER AL TÍTULO DE CADA ELEMENTO DEL ARRAY DE RECETAS DATA
//     .catch(err => console.log('Error añadiendo datos a Recipes:', err))
// })

// .then(() => {
//   Recipe.updateOne({ title: "Rigatoni alla Genovese" }, { duration: 100 }, { new: true })  // NO FUNCIONA
//     .then(det => console.log('Resultado del cambio:', det))           // => "Resultado del cambio: { n: 0, nModified: 0, ok: 1 }"
//     .catch(err => console.log('Error actualizando los datos', err))
// })

// .then(() => {
//   Recipe.deleteOne({ title: "Carrot Cake" })  // NO FUNCIONA
//     .then(info => console.log(info))          // => "{ n: 0, ok: 1, deletedCount: 0 }"
//     .catch(err => console.log('Error al eliminar:', err))
// })

// .catch(error => {
//   console.error('Error connecting to the database', error);
// });