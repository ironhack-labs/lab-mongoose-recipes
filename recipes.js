const mongoose = require('mongoose'); // Don't forget to type $ npm install mongoose

const Schema   = mongoose.Schema;

// Connection to the database
mongoose.connect('mongodb://localhost/w4d3')
  .then(() => {
    console.log('Connected to Mongo!');
  }).catch(err => {
    console.error('Error connecting to mongo', err);
  });

// ----- Goal: update the Schema to implement the features below -----
// ----- Don't forget to execute the code -----
const userSchema = new Schema({
  firstName: {type: String}, // mandatory
  lastName:{type: String}, // mandatory
  gender: {type: String}, // only male or female
  pictureUrl:{type: String}, // must start with https:// or http://
  address: {
    city: {type: String}, // Bonus: Always capitalized: 'berlin' => 'Berlin'
    country: {type: String}, // Always in uppercase
  } 
})

const User = mongoose.model('User', userSchema)

// ----- Check with different value -----
User.create({
  firstName: 'Maxence',
  // lastName: 'Bouret',
  gender: 'male',
  pictureUrl: 'https://avatars2.githubusercontent.com/u/5306791',
  address: {
    city: 'Berlin',
    country: 'Germany',
  },
})
  .then(user => {
    console.log(user)
    mongoose.disconnect()
  })
  .catch(err => console.log(err))