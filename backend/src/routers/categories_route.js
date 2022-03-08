var express = require('express');
var router = express.Router();
var Categories = require('../../controllers/categoriesController');
const auth = require('../middleware/auth');

/*
@ param: req, res
@ Utils: Get an user
@ endpoint: /api/categories/getCategories
@ Method: GET - private (auth required)
*/
router.get('/getCategories', auth, function (req, res) {
    Categories.getCategories(req, res);
})

module.exports = router;
