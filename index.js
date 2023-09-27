const express = require('express');
const port = 8000;
const db = require('./config/mongoose');
const session = require('express-session');
const passport  = require('passport');
const passportLocal = require('./config/passport-local-strategy');

const app = express();

app.set('view engine', 'ejs');
app.set('views', './views')

app.use(session({
    secret : "hello",
    resave : false,
    cookie : { maxAge: 1000*60*100},
})
);

app.set('layout extrcatStyles', true);
app.set('layout extrcatStcripts', true);
app.use(express.urlencoded({extended : true }));
app.use(express.static('./assets'));

// FOR AUTHENTICATION
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser); 

app.use('/',require('./routes'));

app.listen(port, (err) => {
    if(err)
    {
        console.log("Error connecting to server!");
        return; 
    }
    console.log("Listeneing to port : ", port);
})