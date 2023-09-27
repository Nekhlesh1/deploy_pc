const mongoose = require('mongoose');

// NLecA55vhrqvFI3Q
const url = 'mongodb+srv://nekhlesh:NLecA55vhrqvFI3Q@cluster0.d23ikhc.mongodb.net/?retryWrites=true&w=majority'
mongoose.connect(url,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    // pswd : gZFP02oeKNDtud4S
    console.log("Successfully connected to database!! ");
})
.catch((err) => {
    if (err) {
        console.log("Error occured while connecting to database!");
    }
})
module.exports = mongoose ;  