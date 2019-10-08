const express = require('express');
const serveStatic = require('serve-static');
const path = require('path');
const port = process.env.PORT || 80;

let dir = path.join(__dirname, 'dist');

let app = express();
app.use(serveStatic(dir));
app.listen(port);