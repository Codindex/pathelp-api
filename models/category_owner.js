const Sequelize = require("sequelize");
const db = require("../db.js");

const Category_Owner = db.define('category_owner', {});
module.exports = Category_Owner;