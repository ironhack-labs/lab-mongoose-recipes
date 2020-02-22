const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const chefSchema = Schema ({
    name: {
        type: String,
        required: true
    },
    sex: String,

    age: {
        type: Number,
        min: 18
    }
});

const Chef = mongoose.model('Chef', chefSchema);

module.exports = Chef;