const Sequelize = require("sequelize");
const sequelize = require("../db.js");

const db = {}

// ???
db.Sequelize = Sequelize
db.sequelize = sequelize

db.User = require("./user")

db.InterestPoint = require("./interestPoint")
db.Category = require("./category")

db.Point_Category = require("./point_category")
db.Point_Owner = require("./point_owner")
db.Category_Owner = require("./category_owner")

// db.Category.hasMany(db.InterestPoint, {foreignKey: "category_id"})
// db.InterestPoint.belongsTo(db.Category, {foreignKey: "category_id"})

// Relations between categories and points
db.Category.belongsToMany(db.InterestPoint, {
    through: db.Point_Category,
    as: "points",
    foreignKey: "category_id"
})
db.InterestPoint.belongsToMany(db.Category, {
    through: db.Point_Category,
    as: "categories",
    foreignKey: "point_id"
})

db.Category.hasMany(db.Point_Category)
db.Point_Category.belongsTo(db.Category)

db.InterestPoint.hasMany(db.Point_Category)
db.Point_Category.belongsTo(db.InterestPoint)

// Points may have many points inside
db.InterestPoint.belongsToMany(db.InterestPoint, { as: 'child_points', through: 'points_containers' })

// Relations between users and points
db.User.belongsToMany(db.InterestPoint, {
    through: db.Point_Owner,
    as: "points_owned",
    foreignKey: "user_id"
})

db.InterestPoint.belongsToMany(db.User, {
    through: db.Point_Owner,
    as: "owners",
    foreignKey: "point_id"
})

db.User.hasMany(db.Point_Owner)
db.Point_Owner.belongsTo(db.User)
db.InterestPoint.hasMany(db.Point_Owner)
db.Point_Owner.belongsTo(db.InterestPoint)

// Relations between users and categories
db.User.belongsToMany(db.Category, {
    through: db.Category_Owner,
    as: "categories_owned",
    foreignKey: "user_id"
})

db.Category.belongsToMany(db.User, {
    through: db.Category_Owner,
    as: "owners",
    foreignKey: "point_id"
})

db.User.hasMany(db.Point_Owner)
db.Point_Owner.belongsTo(db.User)
db.InterestPoint.hasMany(db.Point_Owner)
db.Point_Owner.belongsTo(db.InterestPoint)

module.exports = db