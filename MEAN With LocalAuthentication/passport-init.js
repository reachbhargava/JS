var LocalStrategy = require('passport-local').Strategy;
var bCrypt = require('bcrypt-nodejs');
var mongoose = require('mongoose')

Users = mongoose.model('Users')

module.exports = function(passport){

    passport.serializeUser(function(user, done) {
        console.log('serializing user:',user._id);
        return done(null, user._id);
    });

    passport.deserializeUser(function(id, done) {
        Users.findById(id, function(err, user) {
            if(err) {
                return done(err)
            }
            if(!user) {
                return done(null, false, {message: 'user not found'})
            }
            return done(null, user)
        })
    });

    passport.use('login', new LocalStrategy(
        function(username, password, done) {
            console.log('Login')
            console.log('username ', username)
            console.log('password ', password)

            Users.findOne({name: username}, function(err, user) {
                if(err) {
//                    return done(err, false)
                    return done(err)
                }
                if (!user) {
                    return done(null, false, { message: 'Username provided does not exist' })
                }
                if(!isValidPassword(user, password)) {
                    return done(null, false, { message: 'Incorrect Password' })
                }
                console.log('Proper user and password. Allowing login')
                return done(null, user)
            })

        }
    ));
    
    passport.use('register', new LocalStrategy(
        function(username, password, done) {
            console.log('Register')
            console.log('username ', username)
            console.log('password ', password)

            Users.findOne({name: username}, function(err, user) {
                if(err) {
                    return done(err)
                }
                console.log('checking if user found after querying?')
                if (user) {
                    console.log("Yeah, coming here since username is found in the db already")
                    return done(null, false, { message: 'Username provided already exists. Choose different'})
                }
                
                console.log('Can register now.')                
                var newUser = new Users();
                newUser.name = username;
                newUser.password = createHash(password);
                newUser.save(function(errHere, data) {
                    if(errHere) {
                        return done(errHere)
                    } else {
                        console.log('Registered successfully.')
                        return done(null, newUser)
                    }
                })
                
            })

        }
    ));

    var isValidPassword = function(user, password){
//        return (password == user.password);
        return bCrypt.compareSync(password, user.password);
    };
    
    // Generates hash using bCrypt
    var createHash = function(password){
        return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
    };

};