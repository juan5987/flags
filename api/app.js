require('dotenv').config();
const express = require('express');
const userRoutes = require('./routes/user');
const scoreRoutes = require('./routes/score');
const flagRoutes = require('./routes/flag');
const app = express();

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', ['https://www.worldflags.fr']);
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, DELETE, PATCH, OPTIONS'
  );
  next();
});

app.use(express.json());

app.get('/', (req, res) => {
  res.send('WorldFlags API v1.0');
});
app.use('/auth', userRoutes);
app.use('/flag', flagRoutes);
app.use(scoreRoutes);

module.exports = app;
