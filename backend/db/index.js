const mongoose = require('mongoose');
require('dotenv').config()
var PASSWORD = process.env.PASSWORD;

mongoose.connect(`mongodb+srv://sys_ctf:${PASSWORD}@cluster0.rtx5d.mongodb.net/plateform_db`, () => {
    console.log("Successfully started DB");
});