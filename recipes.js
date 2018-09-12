const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const data = require('./data.js')

const recipSchema = new Schema({
  title: {type: String, required:true,unique:true},
  level: {type:String, enum:['Easy Peasy','Amateur Chef','UltraPro Chef']},
  ingredients: [],
  cousine:{ type: String, required:true},
  dishType: { type:String, enum:['Breakfast','Dish','Snack','Drink','Dessert','Other']},
  image: { type: String, default: 'https://images.media-allrecipes.com/images/75131.jpg' },
  duration: {type: Number, min:0},
  creator: String,
  created: {type: Date, default: Date.now }
})

const Recip = mongoose.model('Recip',recipSchema)

// Recip.create({title:'test', level:'Easy Peasy', cousine:'Français'})
//   .then((recip) => { console.log('Recip is saved and its value is: ', recip) })
//   .catch((err) => { console.log('An error happened:', err) });

// Recip.insertMany(data)
//   .then((recip) => { console.log('Recip is saved and its value is: ', recip.title) })
//   .catch((err) => { console.log('An error happened:', err) });

// Recip.updateOne({title:"Rigatoni alla Genovese"},{duration:100})
//   .then(()=> {console.log("Done")})
//   .catch((err)=>{console.log(err)})

Recip.deleteOne({title:'Carrot Cake'})
  .then((elem)=> {
      if(elem) {
        console.log("Carrot Cake deleted")
      } else {
        console.log("does not exist")
      }
    
    })
  .catch((err)=>{console.log(err)})

// When successfully connected
mongoose.connection.on('connected', () => {  
  console.log('Mongoose default connection open');
});

mongoose.connect('mongodb://localhost/recipeApp')
  .then(() => {
    console.log('Connected to Mongo!')
  }).catch(err => {
    console.error('Error connecting to mongo', err)
  });

process.on('SIGINT', () => {  
  mongoose.connection.close(() => { 
    console.log('Mongoose default connection disconnected through app termination'); 
    process.exit(0); 
  }); 
}); 
