var mongoose = require('mongoose')
var bodyParser = require('body-parser')
var express = require('express')
var morgan = require('morgan')
var session = require('express-session')
var passport = require('passport')
var app = express()

mongoose.connect("mongodb://localhost/theodoreAnderson", function(error, response) {
    if(error) {
        console.log('Error connecting to MongoDB')
    } else {
        console.log('Connected to MongoDB')
    }    
})
require('./models/models.js')

var router = require('./routes/routes');
var auth = require('./routes/auth')(passport);

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use(morgan('dev'))
app.use(express.static('public'))

app.use(session({ secret: 'keyboard cat' }));
app.use(passport.initialize())
app.use(passport.session())

app.use('/auth', auth)
app.use('/api', router)

var initPassport = require('./passport-init');
initPassport(passport);

/*app.get('/', function(request, response) {
    response.status(200).send("<h1>WELCOME</h1>")
})*/

app.listen(3000, function(err, response) {
    if(err) {
        console.log('Error listening')
    } else {
        console.log('Listening on port 3000')
    }
})
