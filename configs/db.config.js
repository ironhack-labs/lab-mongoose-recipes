const mongoose = require('mongoose');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/recipe-app';

mongoose.connect(MONGODB_URI)
.then(() => console.info('Successfully connected'))
.catch((error) => console.error('An error ocurred', error));
