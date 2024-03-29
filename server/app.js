const express = require('express');
const app = express();
const path = require('path');
const dotenv = require('dotenv');
dotenv.config();
app.use(express.json());

app.use('/dist', express.static(path.join(__dirname, '../dist')));
app.use('/static', express.static(path.join(__dirname, '../static')));

app.get('/', (req, res)=> res.sendFile(path.join(__dirname, '../static/index.html')));

app.use('/api/auth', require('./api/auth'));

app.use('/api/instruments', require('./api/instruments'));

app.use("/api/categories", require("./api/categories"))

app.use("/api/users", require("./api/users"))

app.use('/api/users',require('./api/users'))

const apiRouter = require('./api');
app.use('/api', apiRouter);

app.use((err, req, res, next)=> {
  console.log(err);
  res.status(err.status || 500).send({ error: err.message });
});



module.exports = app;
