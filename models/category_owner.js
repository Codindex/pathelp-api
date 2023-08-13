const Sequelize = require("sequelize");
const db = require("../db.js");

const Category_Owner = db.define('category_owner', {
    is_available: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    }
});
module.exports = Category_Owner;