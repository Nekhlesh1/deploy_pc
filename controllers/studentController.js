const Company = require("../models/companySchema");
const company = require("../models/companySchema");
const Student = require("../models/studentSchema");

// RENDER CREATE STUDENT PAGE
module.exports.createStudentPage = async function (req, res) {
  return res.render("addStudent");
};

// CREATING STUDENT
module.exports.createStudent = async function (req, res) {
  const {
    name,
    email,
    batch,
    college,
    placement,
    contactNumber,
    dsa,
    webd,
    react,
  } = req.body;
  try {
    const student = await Student.findOne({ email });
    if (student) {
      console.log("User with given email already exists ");
      return res.redirect("back");
    }

    const newStudent = await Student.create({
      name,
      email,
      batch,
      college,
      placement,
      contactNumber,
      dsa,
      webd,
      react,
    });
    await newStudent.save();
    return res.redirect("/");
  } catch (err) {
    console.log("Error occured while creating student", err);
    return res.redirect("back");
  }
};

// DELETE STUDENT
module.exports.deleteStudent = async function (req, res) {
  const { id } = req.params;
  try {
    const student  = await Student.findById(id);

    // FIND THE COMAPNY FOR WHICH INTERVIEW IS SCHEDULED AND DELETE STUDENT FROM COMPANY INTERVIEW LIST
    if(student && student.interviews.length > 0){
        for(let item of student.interviews) {
            const company = await Company.findOne({name : item.company});
            if(company) {
                for (let i = 0; i < company.students.length; i++){
                    if(company.students[i].student.toString() === id) {
                        company.students.splice(i,1);
                        company.save();
                        break;
                    }
                }
            }
        }
    }
    await Student.findByIdAndDelete(id);
    res.redirect('back');
  
} catch(err) {
    console.log("Error in deleting student",err);
    return res.redirect('back');

}
};
