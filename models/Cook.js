const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cookSchema = new Schema({
    name : String,
  });
  
const Cook = mongoose.model('Cook', cookSchema);
module.exports = Cook;

