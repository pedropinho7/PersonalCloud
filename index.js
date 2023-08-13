const bodyParser = require('body-parser');
const express = require('express');
const userRoutes = require('./userRoutes');
const db = require('./database.js');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use((req, res, next) => {
    req.db = db;
    next();
});

app.use('/users', userRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on https://localhost:${PORT}.`);
});