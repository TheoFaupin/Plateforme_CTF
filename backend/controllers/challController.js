const Chall = require('../models/Chall');
const Categories = require('../models/Categories');

const getChalls = async (req, res, categorie) => {
    try {
        var categorie = await Categories.findOne({name: categorie}).populate('challenges');
        if (!categorie) {
            res.status(404).json({success: false, msg: "0 Challs of the Categorie."});
            return;
        }
        res.status(200).json({success: true, msg: "Successfully Found your Challs", data: categorie.challenges});
    } catch (err) {
        console.log(err)
        res.status(400).json({success: false, msg: "Error during finding of your challs."});
    }
}

const getChallId = async (req, res, chall_id) => {
    try {
        var currentChall = await Chall.findById(chall_id);
        if (!currentChall) {
            res.status(404).json({success: false, msg: "We didn't found your challenge"});
            return;
        }
        res.status(200).json({success: true, msg: "This is your chall", data: currentChall});
    } catch (err) {
        res.status(400).json({success: false, msg: "Error during finding of the Challenge"});
    }
}


const verifyFlagChall = async (req, res, chall_id) => {
    try {
        var currentChall = await Chall.findById(chall_id);
        if (!currentChall) {
            res.status(404).json({success: false, msg: "We didn't found your challenge"});
            return;
        }
        if (currentChall.flags == req.body.flag) {
            if ((currentChall.userValidated).includes(req.user._id) == false) {
                await Chall.findByIdAndUpdate(chall_id, {$push: {userValidated: req.user._id}})
                res.status(200).json({success: true, msg: "GG! Flag Accepted"});
            } else {
                res.status(403).json({success: false, msg: "You already validated this Challenge."});
            }
        } else {
            res.status(200).json({success: false, msg: "Try again, it's not the flag!"});
        }
    } catch (err) {
        console.log(err)
        res.status(400).json({success: false, msg: "Error during Verification of the Flag of the Challenge"});
    }
}

const createChall = async (req, res, categorie_name) => {
    try {
        var chall_categorie = await Categories.findOne({name: categorie_name});
        if (!chall_categorie)
            chall_categorie = await Categories.create({name: categorie_name});
        var newChall = await Chall.create(req.body);
        await Categories.findByIdAndUpdate(chall_categorie, {...     { $push: { challenges: newChall._id.valueOf() } }})
        res.status(201).json({success: true, msg: "Successfully Created your challenge."});
    } catch (err) {
        console.log(err)
        res.status(400).json({success: false, msg: "Error during Creation of the Challenge"});
    }
}

const updateChall = async (req, res, chall_id) => {
    try {
        await Chall.findByIdAndUpdate(chall_id, {... req.body});
        res.status(200).json({success: true, msg: "Successfully updated your challenge."});
    } catch (err) {
        res.status(400).json({success: false, msg: "Error during update of the challenge."});
    }
}

const deleteChall = async (req, res, chall_id) => {
    try {
        await Chall.findByIdAndDelete(chall_id);
        res.status(200).json({success: true, msg: "Successfully deleted your challenge."});
    } catch (err) {
        res.status(400).json({success: false, msg: "Error during deletion of the challenge."});
    }
}

module.exports = {
    getChalls,
    getChallId,
    verifyFlagChall,
    createChall,
    updateChall,
    deleteChall
}
