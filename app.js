const express = require("express");
const router = require('./routers')

const app = express();
app.use(express.json()); //data stream => json => js object => req.body
app.use(router)





module.exports = app;