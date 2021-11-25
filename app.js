const express = require("express");
const router = require('./routers')
const errorHandler = require('./middlewares/error.handlers.mw');
const app = express();
app.use(express.json()); //data stream => json => js object => req.body
app.use(router);



app.use(errorHandler);
module.exports = app;