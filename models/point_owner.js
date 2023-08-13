const Sequelize = require("sequelize");
const db = require("../db.js");

const Point_Owner = db.define('point_owner', {
    is_available: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    }
});
module.exports = Point_Owner;