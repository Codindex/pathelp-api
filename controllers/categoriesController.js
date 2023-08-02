const db = require("../models/index.js");
const Category = db.Category;
const InterestPoint = db.InterestPoint;

exports.categoriesList = async function(req, res) {
    await Category.findAll({
        attributes: ['category_id', 'name', 'description']
    })
        .then(data => {
            res.json(data);
        })
        .catch(err => {
            res.status(500).json({ message: err.message });
        })
}

exports.addCategory = async function(req, res) {
    let category = Category.build({ name: req.body.name, description: req.body.description });
    await category.save()
        .then(data => {
            res.json(data);
        })
        .catch(err => {
            res.status(500).json({ message: err.message });
        })
}

exports.categoryInfo = async function(req, res) {
    await Category.findOne({ where: { category_id: req.params.id } })
        .then(data => {
            res.json(data);
        })
        .catch(err => {
            res.status(500).json({ message: err.message });
        })
}

exports.modifyCategory = async function(req, res) {
    await Category.update(
        { name: req.body.name, description: req.body.description },
        { where: {category_id: req.body.id} }
    )
        .then(data => {
            res.json(data);
        })
        .catch(err => {
            res.status(500).json({ message: err.message });
        })
}

exports.deleteCategory = async function(req, res) {
    await Category.destroy({ where: {category_id: req.body.id} })
        .then(data => {
            res.json(data);
        })
        .catch(err => {
            res.status(500).json({ message: err.message });
        })
}

exports.categoryPointsList = async function(req, res) {
    await Category.findOne({
        where: { category_id: req.params.id },
        include: [InterestPoint]
    })
        .then(data => {
            res.json(data);
        })
        .catch(err => {
            res.status(500).json({ message: err.message });
        })
}

const { Op } = require("sequelize")
exports.categoryPointsListUpdate = async function(req, res) {
    await Category.update(
        { points: req.body.points },
        { where: { category_id: req.params.id } }
    )
        .then(data => {
            res.json(data);
        })
        .catch(err => {
            res.status(500).json({ message: err.message });
        })
}

exports.categoryExtended = async function(req, res) {
    await Category.findOne({
        where: { category_id: req.params.id }
    })
        .then(data => {
            res.json(data);
        })
        .catch(err => {
            res.status(500).json({ message: err.message });
        })
}

exports.categoryActivation = async function(req, res) {
    
}