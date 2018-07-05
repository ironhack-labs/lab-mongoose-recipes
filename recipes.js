const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const data = require("./data.js");

const recipeSchema = new Schema({
  title: { type: String, required: true, unique: true },
  level: {
    type: String,
    enum: ["Easy Peasy", "Amateur Chef", "UltraPro Chef"]
  },
  ingredients: [],
  cousine: { type: String, required: true },
  dishType: {
    type: String,
    enum: ["Breakfast", "Dish", "Snack", "Drink", "Dessert", "Other"]
  },
  image: {
    type: String,
    default: "https://images.media-allrecipes.com/images/75131.jpg"
  },
  duration: { type: Number, min: 0 },
  creator: String,
  created: { type: Date, default: Date.now() }
});

const NewRecipe = mongoose.model("NewRecipe", recipeSchema);

mongoose
  .connect("mongodb://localhost/recipeApp") // me conecto
  .then(() => {     //una vez conectado
    console.log("Connected to Mongo!");
    mongoose.connection.db.dropDatabase();  // Borra cada vez que actualiza
    create()    // Ejecuta esta funcion
      .then(r => {    // Una vez que la ejecute
      console.log(r)
      createMany()     // Ejecuta esta funcion
        .then(arr => {// Una vez que la ejecute
          console.log(arr.length)
          updateRigatoni()
          .then (ok => {
            console.log('Ok')
            removeCarrot()
            .then (borrado => {
              console.log('Borrado')
              mongoose.connection.close()
            })
        }) 
        
        });   
    });
  })
  .catch(err => {
    console.error("Error connecting to mongo", err);
  });

const create = () => {
  return NewRecipe.create({ title: "Canelones", cousine: "Italian" });
};
const createMany = () => {
  return NewRecipe.insertMany(data);
};

// For the user with _id "5a3a7ecbc6ca8b9ce68bd41b", increment the salary by 4200

const updateRigatoni = () => {
  return NewRecipe.updateOne( {title:'Rigatoni alla Genovese'}, {duration:100})
}

const removeCarrot = () =>{
  return NewRecipe.deleteOne ( { title:'Carrot Cake'})
}
//module.exports
