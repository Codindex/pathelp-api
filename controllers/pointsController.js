const db = require("../models/index.js");
const InterestPoint = db.InterestPoint;

const points_attributes = ['point_id', 'name', 'description']

exports.pointsList = async function(req, res) {
    await InterestPoint.findAll({
        attributes: points_attributes
    })
        .then(data => {
            res.json(data);
        })
        .catch(err => {
            res.status(500).json({ message: err.message });
        })
}

exports.pointsListAdvanced = async function(req, res) {
    await InterestPoint.findAll({
        attributes: points_attributes
    })
        .then(data => {
            res.json(data);
        })
        .catch(err => {
            res.status(500).json({ message: err.message });
        })
}

exports.addPoint = async function(req, res) {
    // print(req.body);
    let point = InterestPoint.build({
        name: req.body.name,
        description: req.body.description,
        categories: req.body.categories,
        owners: [req.userId]
    });
    await point.save()
        .then(data => {
            res.json(data);
        })
        .catch(err => {
            res.status(500).json({ message: err.message });
        })
}

exports.pointInfo = async function(req, res) {
    await InterestPoint.findOne({
        attributes: points_attributes,
        where: { point_id: req.params.id }
    })
        .then(data => {
            res.json(data);
        })
        .catch(err => {
            res.status(500).json({ message: err.message });
        })
}

exports.modifyPoint = async function(req, res) {
    await InterestPoint.update(
        {
            name: req.body.name,
            description: req.body.description,
            categories: req.body.categories
        },
        { where: {point_id: req.body.id} }
    )
        .then(data => {
            res.json(data);
        })
        .catch(err => {
            res.status(500).json({ message: err.message });
        })
}

exports.deletePoint = async function(req, res) {
    await InterestPoint.destroy({ where: {point_id: req.body.id} })
        .then(data => {
            res.json(data);
        })
        .catch(err => {
            res.status(500).json({ message: err.message });
        })
}

exports.pointExtended = async function(req, res) {
    await InterestPoint.findOne({ where: {point_id: req.params.id} })
        .then(data => {
            res.json(data);
        })
        .catch(err => {
            res.status(500).json({ message: err.message });
        })
}

exports.pointActivation = async function(req, res) {
    await db.Point_Owner.update(
        {
            is_available: req.body.available
        },
        { where: { point_id: req.params.id } }
    )
        .then(data => {
            res.json(data);
        })
        .catch(err => {
            res.status(500).json({ message: err.message });
        })
}