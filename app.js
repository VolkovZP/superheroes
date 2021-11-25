const express = require("express");
const router = require('./routers')
const errorHandler = require('./middleware/error.mw');
const app = express();
app.use(express.json()); //data stream => json => js object => req.body
app.use(router);



app.use(errorHandler);
module.exports = app;