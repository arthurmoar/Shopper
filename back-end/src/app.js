const express = require('express');
const cors = require('cors');

const productsRouter = require('./router');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/products', productsRouter);

module.exports = app;