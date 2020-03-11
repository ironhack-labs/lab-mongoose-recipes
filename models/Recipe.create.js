const User = require('/models/User');

User.create()
    .then(user => { console.log('The user is saved and its value is: ', user) })
    .catch(err => { console.log('An error happened:', err)
});