const { Op } = require("sequelize");
const jwt = require("jsonwebtoken")
const db = require("../models/index.js");
const User = db.User;

const loginKey = 'my_secret_key'

exports.createAccount = async function(req, res, next) {
    let username = req.body.username
    let password = req.body.password
    let user = await User.build({
        name: username,
        password: password
    })
    await user.save()
        .then(data =>
            res.json(data)
        )
        .catch(err =>
            res.status(500).json({ message: err.message })
        )
}

exports.verifyPassword = async function(req, res, next) {
    await User.findOne({
        where: {
            name: req.body.username,
            password: req.body.password
        }
    })
        .then(data => {
            if (data === null) res.status(401).json({ message: "No user found with this username"});
            else if (data.password !== req.body.password) res.status(403).json({ message: "Bad password" });
            else {
                req.idUser = data.user_id
                return next()
            }
        })
        .catch(err => {
            res.status(500).json({ message: err.message });
        })
}

exports.login = async function(req, res, next) {
    const jwtKey = loginKey
    const jwtExpirySeconds = req.session.cookie.maxAge

    let payload = { id: req.idUser }
    let token = jwt.sign(payload, jwtKey, {
        algorithm: "HS256",
        expiresIn: jwtExpirySeconds
    })

    req.session.token = token
    res.cookie("token", token, { httpOnly: true, secure: true, maxAge: jwtExpirySeconds * 1000})
    res.json({token: token , maxAge: jwtExpirySeconds * 1000})
}

// exports.adminLogin = async function(req, res, next) {
//     const jwtKey = adminKey
//     const jwtExpirySeconds = req.session.cookie.maxAge/1000

//     let user = req.body.user

//     let payload = { id: user.id }
//     let token = jwt.sign(payload, jwtKey, {
//         algorithm: "HS256",
//         expiresIn: jwtExpirySeconds
//     })

//     req.session.token = token
//     res.cookie("token", token, { httpOnly: true, secure: true, maxAge: jwtExpirySeconds * 1000})
//     res.json({token: token , maxAge: jwtExpirySeconds * 1000})
// }

exports.isLogin = async function(req, res, next) {
    let auth = req.headers.autorization
    if (typeof auth !== 'undefined') {
        let token = auth.split(" ")[1]
        jwt.verify(token, loginKey, (err, payload) => {
            if (err) {
                res.status(401).json({ error: "Not Authorized"})
            }
            req.userId = payload;
            return next();
        })
    }
}

exports.isAdmin = async function(req, res, next) {
    // let auth = req.headers.autorization
    // if (typeof auth !== 'undefined') {
    //     let token = auth.split(" ")[1]
    //     jwt.verify(token, adminKey, (err, payload) => {
    //         if (err) {
    //             res.status(401).json({ error: "Not Authorized"})
    //         }
    //         req.userId = payload;
    //         return next();
    //     })
    // }

    await User.findOne({
        where: {
            user_id: req.userId,
            isAdmin: true
        }
    })
        .then(data => {
            if (data === null) {
                res.status(403).json({ message: "You're not authorized to do that !" });
            } else {
                return next()
            }
        })
        .catch(err => {
            res.status(500).json({ message: err.message });
        })
}

exports.ownerAuth = async function(req, res, next) {

    let auth = req.headers.autorization
    if (typeof auth !== 'undefined') {
        let token = auth.split(" ")[1]
        jwt.verify(token, loginKey, (err, payload) => {
            if (err) {
                res.status(401).json({ error: "Not Authorized"})
            }
            // Verify if point.OwnerId == payload
            // req.user = payload;
            return next();
        })
    }
}

exports.canModify = async function(req, res, next) {
    await User.findOne({
        where: {
            user_id: req.userId,
            [Op.or]: [
                { isAdmin: true },
                { points_owned: [req.body.id_point] },
                { categories_owned: [req.body.id_category] }
            ]
        }
    })
        .then(data => {
            if (data === null) {
                res.status(403).json({ message: "You're not authorized to do that !" });
            } else {
                return next()
            }
        })
        .catch(err => {
            res.status(500).json({ message: err.message });
        })
}