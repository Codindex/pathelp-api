const express = require("express");

let router = express.Router();

let authCtrl = require("./controllers/authController.js")

// Redirect to homepage
// router.get('/', (req, res) => res.redirect('/points'));
router.get('/', (req, res) => "This is the main page for the api");

let catsCtrl = require("./controllers/categoriesController.js")
// Categories list
router.get('/categories', catsCtrl.categoriesList);

// Add new category
router.post('/category', authCtrl.isLogin, catsCtrl.addCategory);

// More info
router.get('/category/:id', catsCtrl.categoryInfo);
router.put('/category/:id', authCtrl.isLogin, authCtrl.canModify, catsCtrl.modifyCategory);
router.delete('/category/:id', authCtrl.isLogin, authCtrl.canModify, catsCtrl.deleteCategory);

// Points associated to each category
router.get('/category/:id/points', catsCtrl.categoryPointsList);
router.put('/category/:id/points', authCtrl.isLogin, authCtrl.canModify, catsCtrl.categoryPointsListUpdate);

// Managing commands
router.get('/category/:id/details', authCtrl.isLogin, authCtrl.canModify, catsCtrl.categoryExtended);
router.put('/category/:id/activation', authCtrl.isLogin, authCtrl.canModify, catsCtrl.categoryActivation);


let pointsCtrl = require("./controllers/pointsController.js")
// Points list
router.get('/points', pointsCtrl.pointsList);
router.post('/points', pointsCtrl.pointsListAdvanced);

// Add new point
router.post('/point', authCtrl.isLogin, pointsCtrl.addPoint);

// More info
router.get('/point/:id', pointsCtrl.pointInfo);
router.put('/point/:id', authCtrl.isLogin, authCtrl.canModify, pointsCtrl.modifyPoint);
router.delete('/point/:id', authCtrl.isLogin, authCtrl.canModify, pointsCtrl.deletePoint);

// Managing commands
router.get('/point/:id/details', authCtrl.isLogin, authCtrl.canModify, pointsCtrl.pointExtended);
router.put('/point/:id/activation', authCtrl.isLogin, authCtrl.canModify, pointsCtrl.pointActivation);


// Login
// router.post('/login', async function (req , res , next) {
//     const jwt = require("jsonwebtoken")
//     const jwtKey = "my_secret_key"
//     const jwtExpirySeconds = 300

//     // let payload = { id: user.iduser };
//     let payload = { id: 1 };
//     let token = jwt.sign(payload , jwtKey , {
//         algorithm: "HS256",
//         expiresIn: jwtExpirySeconds
//     })

//     res.cookie("token", token, { httpOnly: true, secure: true, maxAge: jwtExpirySeconds * 1000})
//     res.json({token: token , maxAge: jwtExpirySeconds * 1000})
// });
router.post('/login', authCtrl.verifyPassword, authCtrl.login);

router.post('/user/add', authCtrl.createAccount);


module.exports = router