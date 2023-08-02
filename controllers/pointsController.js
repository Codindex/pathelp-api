const db = require("../models/index.js");
const InterestPoint = db.InterestPoint;

exports.pointsList = async function(req, res) {
    await InterestPoint.findAll({
        attributes: ['point_id', 'name', 'description']
    })
        .then(data => {
            res.json(data);
        })
        .catch(err => {
            res.status(500).json({ message: err.message });
        })
}

exports.pointsListAdvanced = async function(req, res) {

}

exports.addPoint = async function(req, res) {
    // print(req.body);
    let point = InterestPoint.build({ name: req.body.name, description: req.body.description });
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
        attributes: ['point_id', 'name', 'description'],
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
        { name: req.body.name, description: req.body.description },
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
    
}