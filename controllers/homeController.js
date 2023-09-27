const Student = require('../models/studentSchema');

module.exports.homePage = async (req,res) => {
    const students = await Student.find({});
    return res.render('home', {students});
}