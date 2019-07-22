const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cookSchema = new Schema({
  fullName: String,
  nationality: String
});

const Cook = mongoose.model('cooks', cookSchema);

module.exports = Cook;
