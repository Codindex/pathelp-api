const Sequelize = require("sequelize");

const sequelize = new Sequelize(
    "pathelp",
    "Api",
    "AeWB23-M",
    {
        dialect: "mysql",
        host: "localhost"
    }
)
module.exports = sequelize;