const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cookSchema = new Schema({

  // TODO! Add equivalent frontend validation check, or pass a message to user
  fullName: {
    type: String,
    required: true
  },
  nationality: String
});

const Cook = mongoose.model('cooks', cookSchema);

module.exports = Cook;
