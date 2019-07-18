#!/usr/bin/env node

const http = require('http');

let app = require('../app');

let server = http.createServer(app);

server.listen(process.env.PORT, () => {
  console.log(`Listening on http://localhost:${process.env.PORT}`);
});
