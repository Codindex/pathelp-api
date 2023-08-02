const Sequelize = require("sequelize");
const db = require("../db.js");

const User = db.define('user', {
    user_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: { type: Sequelize.STRING, allowNull: false },
    password: {
        type: Sequelize.STRING,
        allowNull: false,
        // set(value) {
        //     this.setDataValue('password')
        // }
    },
    isAdmin: { type: Sequelize.BOOLEAN, defaultValue: false}
});
module.exports = User;