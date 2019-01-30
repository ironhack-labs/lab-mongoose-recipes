const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const data = require('./data.js');


const recipesSchema = new Schema ({
  title:{type:String, required:true, unique:true},
  level:{ type:String,enum:['Easy Peasy','Amateur Chef','UltraPro Chef']},
  ingredients:Array,
  cuisine:{type:String, required:true},
  dishType:{type:String,  enum:['Breakfast', 'Dish', 'Snack', 'Drink', 'Dessert', 'Other']},
  image: {type:String, default: 'https://images.media-allrecipes.com/images/75131.jpg.'},
  duration:{type:Number, min:0},
  creator:String,
  created:{type:Date, default:Date.now}

})

const Recipe = mongoose.model('recipe',recipesSchema)



mongoose.connect('mongodb://localhost/recipeApp')
  .then(() => {
    console.log('Connected to Mongo!');


     let promise1 = Recipe.create(
      {title:'Infernal Alvarobros cocletas',
      level:'UltraPro Chef',
      ingredients:['Miradas sexys de David', 'jamón, no puede faltar','musculos de Germán'],
      cuisine:'La cama de Jesús',
      dishType:'Dessert',
      duration:69,
      creatod: 'Infernal Alvarobros'
      })
        .then(recipe=>{console.log('The recipe title is:',recipe.title)})
        .catch(err=>{console.log('Aprende a comer bien hijoputer')})

      let promise2 = Recipe.insertMany(data)
        .then(data=>{console.log('Título:',data.map(recipe => recipe.title))})
        .catch(err2=>{console.log('Aprende a comer bien hijoputer')})

      let promise3 = Recipe.updateOne({title:'Rigatoni alla Genovese'},{duration:100})
        .then(data=>{console.log('Todo arreglado')})
        .catch(err=>{console.log('Ha habido un problema')})

      let promise4 = Recipe.deleteOne({title:'Carrot Cake'})
        .then(data=>{console.log('Borrado lo que había que borrar')})
        .catch(err=>{console.log('Aquí no hemos hecho nada friend')})

    Promise.all([promise1,promise2,promise3,promise4])
      .then(data=>{
        console.log('Tutto bene')
        mongoose.connection.close()
      })
      .catch(err=>console.log('culamen!!!'))
      

  }).catch(err => {
    console.error('Error connecting to mongo', err);
  });


  

 