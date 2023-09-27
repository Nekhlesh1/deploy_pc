const express = require('express');
const router = express.Router();
const usersRoutes = require('./userRoute');
const studentRoutes = require('./studentRoute');
const companyRoutes = require('./companyRoute');
const homeController = require('../controllers/homeController');
const passport = require('passport');



router.get('/',passport.checkAuthentication, homeController.homePage);
router.use('/users', usersRoutes);
router.use('/students', studentRoutes);
router.use('/company',companyRoutes);

module.exports = router; 