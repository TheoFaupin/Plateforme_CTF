const Categories = require('../models/Categories');

const getCategories = async (req, res) => {
    try {
        var categories = await Categories.find({}).populate('challenges');
        res.status(200).json({success: true, msg: "Successfully Found your Challs", data: categories});
    } catch (err) {
        res.status(400).json({success: false, msg: "Error during finding of your challs."});
    }
}

const createCategorie = async (categorie_name) => {
    try {
        return await Categories.create({name: categorie_name});
    } catch (err) {
        res.status(404).json({success: true, msg: "Error during Creation of your Categorie"});
    }
}

const updateCategorie = async (req, res, categorie_id) => {
    try {
        return await Categories.findByIdAndUpdate(categorie_id, {... req.body});
    } catch (err) {
        res.status(404).json({success: true, msg: "Error during Updating your Categorie"});
    }
}

module.exports = {
    getCategories,
    createCategorie,
    updateCategorie
}