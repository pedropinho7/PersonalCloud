const bodyParser = require('body-parser');
const express = require('express');
const userRoutes = require('./userRoutes');

const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use('/users', userRoutes);

module.exports = app;