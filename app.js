const express = require('express');
const app = express();


app.get('/', (request, response) => {
    console.log(request);
    response.send('<h1>HOOOOOOOOOOOOOLLLLLLAAAAAAAAAAAA:)</h1>');
});


app.listen(3000, () => console.log('server started'));
