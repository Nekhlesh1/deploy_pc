const express = require('express');
const passport = require('passport');
const router = express.Router();
const userController = require('../controllers/userControllers')

// router.get('/', homeController.homePage);

router.get('/sign-up', userController.signUp);
router.get('/sign-in', userController.signIn);
router.get('/sign-out',passport.checkAuthentication, userController.signOut);
router.get("/download-csv", passport.checkAuthentication, userController.downloadCsv);

router.post('/create', userController.createUser);
router.post('/create-session', passport.authenticate('local', { failureRedirect: "/users/sign-in" }), userController.createSession);

module.exports = router;