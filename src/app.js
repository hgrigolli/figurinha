const express = require('express');
const app = express();
var bodyParser = require('body-parser')

//Parsers

app.use(bodyParser.json());       // to support JSON-encoded bodies

// Rotas
const figurinhasRoutes = require('./routes/figurinhasRoutes');
app.use('/api/figurinhas', figurinhasRoutes);
module.exports = app;
