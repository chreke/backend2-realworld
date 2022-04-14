const express = require('express');
const path = require('path');
const mongoose = require('./database');
const { authorizeUser } = require('./middlewares/authMiddleware');

const app = express();
const PORT = 3000;

app.use(express.static('dist'));
app.use(express.json());
app.use(authorizeUser);

app.use(express.urlencoded({ extended: true }));

app.use('/', require('./routes/userRoutes'));
app.use('/', require('./routes/articleRoutes'));

app.get('/', (_req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Started Express server on port ${PORT}`);
});
