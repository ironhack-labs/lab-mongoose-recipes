const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const recipeSchema = new Schema({
    title: {
        type: String,
        required: true,
        default: 'Desconocido',
          
    },
    level: {
        type: String,
      // validate: {
      //   validator: function validator(val1) {
      //     if (val1 === 'Easy Peasy' || val1 ==='Amateur Chef' ||val1==='UltraPro Chef ') {
      //       return val1 == 'something';
      //     }
      //   }
      // },

    enum: ['Easy Peasy', 'Amateur Chef', 'UltraPro Chef'],
                   
    },
    ingredients: {
        type: [ String],
  
       
    },
    cuisine: {
      type: String,
      required: true,
    },
    dishType: {
        type: String,
         default: "https://images.media-allrecipes.com/images/75131.jpg",
    },
    duration: {
        type: Number,
        min: 0,
        },
     creator: {
        type: String,
        
  },
      created: {
        type: Date,
        default: Date.now()
        },
});

const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;
