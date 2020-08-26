"use strict";

var mongoose = require('mongoose'); // Import of the model Recipe from './models/Recipe.model.js'


var Recipe = require('./models/Recipe.model'); // Import of the data from './data.json'


var data = require('./data');

var MONGODB_URI = 'mongodb://localhost:27017/recipe-app'; // Connection to the database "recipe-app"

mongoose.connect(MONGODB_URI, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(function (self) {
  console.log("Connected to the database: \"".concat(self.connection.name, "\"")); // Before adding any documents to the database, let's delete all previous entries

  return self.connection.dropDatabase();
}).then(function () {
  function saveFood() {
    var receta, recetas;
    return regeneratorRuntime.async(function saveFood$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return regeneratorRuntime.awrap(Recipe.create({
              title: "Chilaquiles",
              levele: "Easy Peasy",
              cuisine: "Mexican"
            }));

          case 2:
            receta = _context.sent;
            console.log("Chilaquiles"); //iteration 3

            _context.next = 6;
            return regeneratorRuntime.awrap(Recipe.insertMany(data));

          case 6:
            _context.next = 8;
            return regeneratorRuntime.awrap(Recipe.find({}, {
              title: 1
            }));

          case 8:
            recetas = _context.sent;
            console.log(recetas); //iteration 4

            _context.next = 12;
            return regeneratorRuntime.awrap(Recipe.findOneAndUpdate({
              title: "Rigatoni alla Genovese"
            }, {
              duration: 100
            }, {
              returnOriginal: false
            }));

          case 12:
            console.log("Rigatoni alla Genovese - update"); //iteration 5

            _context.next = 15;
            return regeneratorRuntime.awrap(Recipe.findOneAndDelete({
              title: "Carrot Cake"
            }));

          case 15:
            console.log("Carrot Cake Recipe no longer exists!"); //iteration 6

            _context.next = 18;
            return regeneratorRuntime.awrap(mongoose.connection.close());

          case 18:
            console.log("Mongoose default connection disconnected through app termination");

          case 19:
          case "end":
            return _context.stop();
        }
      }
    });
  }

  saveFood(); // Run your code here, after you have insured that the connection was made
})["catch"](function (error) {
  console.error('Error connecting to the database', error);
});