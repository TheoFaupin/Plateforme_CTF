const express = require('express');
const bodyParser = require('body-parser');
var userRoute = require('./routers/user_route');
var challRoute = require('./routers/chall_route');
var categoriesRoute = require('./routers/categories_route');
var cors = require('cors');
require("../db/index");

var app = express();

app.use(bodyParser.json());
app.use(cors());

app.use('/api/user', userRoute);
app.use('/api/chall', challRoute);
app.use('/api/categories', categoriesRoute);

/*
@ param: req, res
@ Utils: Not Found
@ endpoint: *
*/
app.all('*', (req, res) => {
    res.status(404).json({success: false, msg: "Page not found."})
})

app.listen(3000, () => {
    console.log("Server started")
})
