var express = require('express');
var router = express.Router();
var Chall = require('../../controllers/challController');
const auth = require('../middleware/auth');

/*
@ param: req, res, categorie
@ Utils: Get All Challenges
@ endpoint: /api/chall/getChallenges/:categorie
@ Method: GET - private (auth required)
*/
router.get('/getChallenges/:categorie', auth, function (req, res) {
  Chall.getChalls(req, res, req.params.categorie);
})

/*
@ param: req, res, categorie
@ Utils: Get All Challenges
@ endpoint: /api/chall/getChall/:id
@ Method: GET - private (auth required)
*/
router.get('/getChall/:id', function (req, res) {
  Chall.getChallId(req, res, req.params.id);
})

/*
@ param: req, res, chall_id
@ Utils: Get All Challenges
@ endpoint: /api/chall/verify/:id
@ Method: POST - private (auth required)
*/
router.post('/verify/:id', auth, function (req, res) {
  Chall.verifyFlagChall(req, res, req.params.id);
})

/*
@ param: req, res, categorie
@ Utils: Create a Challenge
@ endpoint: /api/chall/create/:categorie
@ Method: POST - private (auth required)
*/
router.post('/create/:categorie', auth, function (req, res) {
  if (req.user.role == 2) {
    Chall.createChall(req, res, req.params.categorie);
  } else {
    res.status(401).json({success: false, msg: "Unauthorized"});
  }
})

/*
@ param: req, res, id
@ Utils: Update a Challenge
@ endpoint: /api/chall/update/:id
@ Method: PATCH - private (auth required)
*/
router.patch('/update/:id', auth, function (req, res) {
  if (req.user.role == 2) {
    Chall.updateChall(req, res, req.params.id);
  } else {
    res.status(401).json({success: false, msg: "Unauthorized"});
  }
})

/*
@ param: req, res, id
@ Utils: Delete a Challenge
@ endpoint: /api/chall/delete/:id
@ Method: DELETE - private (auth required)
*/
router.delete('/delete/:id', auth, function (req, res) {
  if (req.user.role == 2) {
    Chall.deleteChall(req, res, req.params.id);
  } else {
    res.status(401).json({success: false, msg: "Unauthorized"});
  }
})

module.exports = router;