require("dotenv").config();
require("./config/database").connect();
const express = require("express");

const app = express();
const api = require('./router/api')

app.use(express.json());
app.use('/api', api)

module.exports = app;