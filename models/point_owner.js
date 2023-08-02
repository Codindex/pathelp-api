const Sequelize = require("sequelize");
const db = require("../db.js");

const Point_Owner = db.define('point_owner', {});
module.exports = Point_Owner;