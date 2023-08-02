const express = require("express");

let router = express.Router();

let authController = require("./controllers/authController.js")

// Redirect to homepage
// router.get('/', (req, res) => res.redirect('/points'));
router.get('/', (req, res) => "This is the main page for the api");

let categoriesController = require("./controllers/categoriesController.js")
// Categories list
router.get('/categories', categoriesController.categoriesList);

// Add new category
router.post('/category', categoriesController.addCategory);

// More info
router.get('/category/:id', categoriesController.categoryInfo);
router.put('/category/:id', categoriesController.modifyCategory);
router.delete('/category/:id', categoriesController.deleteCategory);

// Points associated to each category
router.get('/category/:id/points', categoriesController.categoryPointsList);
router.put('/category/:id/points', categoriesController.categoryPointsListUpdate);

// Managing commands
router.get('/category/:id/details', categoriesController.categoryExtended);
router.put('/category/:id/activation', categoriesController.categoryActivation);


let pointsController = require("./controllers/pointsController.js")
// Points list
router.get('/points', pointsController.pointsList);
router.post('/points', pointsController.pointsListAdvanced);

// Add new point
router.post('/point', pointsController.addPoint);

// More info
router.get('/points/:id', pointsController.pointInfo);
router.put('/points/:id', pointsController.modifyPoint);
router.delete('/points/:id', pointsController.deletePoint);

// Managing commands
router.get('/points/:id/details', pointsController.pointExtended);
router.put('/points/:id/activation', pointsController.pointActivation);


// Login
router.post('/login', async function (req , res , next) {
    const jwt = require("jsonwebtoken")
    const jwtKey = "my_secret_key"
    const jwtExpirySeconds = 300

    // let payload = { id: user.iduser };
    let payload = { id: 1 };
    let token = jwt.sign(payload , jwtKey , {
        algorithm: "HS256",
        expiresIn: jwtExpirySeconds
    })

    res.cookie("token", token, { httpOnly: true, secure: true, maxAge: jwtExpirySeconds * 1000})
    res.json({token: token , maxAge: jwtExpirySeconds * 1000})
});


module.exports = router