var LocalStrategy   = require('passport-local').Strategy;
var bCrypt = require('bcrypt-nodejs');
var mongoose = require('mongoose')

User = mongoose.model('User')

module.exports = function(passport){

    // Passport needs to be able to serialize and deserialize users to support persistent login sessions
    passport.serializeUser(function(user, done) {
        console.log('serializing user:',user._id);
        return done(null, user._id);
    });

    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            if(err) {
                return done(err, false)
            }
            if(!user) {
                return done('user not found', false)
            }
            return done(null, user)
        })
    });

    passport.use('signup', new LocalStrategy(
          function(username, password, done) {
                User.findOne({username: username}, function(err, user) {
                    if(err) {
                        return done(err, false)
                    }

                    if(user) {
                        console.log('The UserName already exists')
                        return done(null, false)
                    }

                    var newUser = new User();
                    newUser.username = username;
                    newUser.password = createHash(password);
                    newUser.save(function (err, user) {
                        if (err) {
                            return done(err, false)
                        }
                        console.log('Registration successfull for ' + username);
                        return done(null, newUser)                      
                    })

                })
                
          }
    ));

    passport.use('login', new LocalStrategy(
        function(username, password, done) { 
            console.log('login method')
            console.log('username ', username)
            console.log('password ', password)

            User.findOne({username: username}, function(err, user) {
                if(err) {
                    return done(err, false)
                }
                if (!user) {
                    return done('Username provided does not exist', false)
                }
                if(!isValidPassword(user, password)) {
                    return done('Incorrect password', false)
                }

                // Login succesful
                return done(null, user)
            })

        }
    ));

    var isValidPassword = function(user, password){
        console.log('valid 1')
        return bCrypt.compareSync(password, user.password);
        console.log('valid 2')
    };
    // Generates hash using bCrypt
    var createHash = function(password){
        return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
    };

};