const User = require("../models/userSchema")
const Student = require("../models/studentSchema");
const fs = require("fs");
const fastcsv = require("fast-csv");

// SIGNUP
module.exports.signUp = async (req, res) => {
    if(req.isAuthenticated())
    {
        return res.redirect('back');
    }
    return res.render('signup')
}
// SIGNIN 
module.exports.signIn = async (req, res) => {
    if(req.isAuthenticated())
    {
        return res.redirect('back')
    }
    return res.render('signin')
}

// CREATE SESSION
module.exports.createSession = async (req, res) => {
    console.log("Sign in successfull!! ")
    return res.redirect('/');
}

// SIGNOUT
module.exports.signOut = function (req, res) {
    req.logout(function(err){
        if(err)
        {
            return next(err);
        }
    });
    return res.redirect('/users/signin');
};



// CREATING NEW USER
module.exports.createUser = async (req, res) => {
    // OBJECT DESTRUCTURING
    const { name, email, password, confirmPassword } = req.body;
    try {
        // CHECKING IF PASSWORD ENTERED MATCHES
        if (password != confirmPassword) {
            console.log("Password and confirm password must be same! Please try again!");
            return redirect('back');
        }

        //  FINDING USER IN DB WITH GIVEN EMAIL
        const user = await User.findOne({ email });

        // IF USER EMAIL ALREADY EXISTS GO BACK
        if (user) {
            console.log("User already exists! Please try logging in!");
            return res.redirect('back');
        }
        
        // CREATING NEW USER
        const newUser = await User.create({
            name,
            email,
            password,
        });
        await newUser.save();
        
        if(newUser)
        {
            console.log("User created successffully")
        }
        return res.redirect('/users/sign-up');

    }
    catch (error) {
        console.log("Error in creating user ");
        res.redirect('back');
    }

}

// download report
module.exports.downloadCsv = async function (req, res) {
	try {
		const students = await Student.find({});

		let data = '';
		let no = 1;
		let csv = 'S.No, Name, Email, College, Placemnt, Contact Number, Batch, DSA Score, WebDev Score, React Score, Interview, Date, Result';

		for (let student of students) {
			data =
				no +
				',' +
				student.name +
				',' +
				student.email +
				',' +
				student.college +
				',' +
				student.placement +
				',' +
				student.contactNumber +
				',' +
				student.batch +
				',' +
				student.dsa +
				',' +
				student.webd +
				',' +
				student.react;

			if (student.interviews.length > 0) {
				for (let interview of student.interviews) {
					data += ',' + interview.company + ',' + interview.date.toString() + ',' + interview.result;
				}
			}
			no++;
			csv += '\n' + data;
		}

		const dataFile = fs.writeFile('report/data.csv', csv, function (error, data) {
			if (error) {
				console.log(error);
				return res.redirect('back');
			}
			console.log('Report generated successfully');
			return res.download('report/data.csv');
		});
	} catch (error) {
		console.log(`Error in downloading file: ${error}`);
		return res.redirect('back');
	}
};