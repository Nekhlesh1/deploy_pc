const express = require("express");
const passport = require("passport");
const router = express.Router();
const studentController = require("../controllers/studentController");


router.get('/create', passport.checkAuthentication, studentController.createStudentPage);
router.get('/delete/:id', passport.checkAuthentication, studentController.deleteStudent);
router.post('/create-student',passport.checkAuthentication, studentController.createStudent);

module.exports = router;