var express = require('express');
var router = express.Router();

module.exports = function(passport){

    //sends successful login state back to angular
    router.get('/success', function(req, res) {
        console.log('come here? as success? ', req.body)
        res.send({state: 'success', user: req.user ? req.user : null});
    });

    //sends failure login state back to angular
    router.get('/failure', function(req, res){
        res.send({state: 'failure', user: null, message: "Invalid username or password"});
    });

    //log in
    router.post('/login', passport.authenticate('login', {
        successRedirect: '/auth/success',
        failureRedirect: '/auth/failure'
    }));

    //sign up
    /*router.post('/signup', passport.authenticate('signup', {
        successRedirect: '/auth/success',
        failureRedirect: '/auth/failure'
    }));*/

    
    router.post('/signup', 
                    passport.authenticate('signup', 
                                                {
                                                    successRedirect: '/auth/success',
                                                    failureRedirect: '/auth/failure'
                                                })
                    
        );

    //log out
    router.get('/signout', function(req, res) {
        /* The below is provided by passport. */
        req.logout();
        console.log('comes here 222')
        res.redirect('/');
    });

    return router;

}