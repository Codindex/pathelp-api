const Sequelize = require("sequelize");
const db = require("../db.js");

const InterestPoint = db.define('point', {
    point_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: { type: Sequelize.STRING, allowNull: false },
    description: { type: Sequelize.STRING, allowNull: false }
});
module.exports = InterestPoint;