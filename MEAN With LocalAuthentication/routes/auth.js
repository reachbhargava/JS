/*var mongoose = require('mongoose')*/
var express = require('express');
var router = express.Router();

module.exports = function(passport) {
    /*router.route('/login')
        .post(function(request, response) {
            console.log('request.body.name ', request.body.name);
            console.log('request.body.password ', request.body.password);

        })*/
    
    router.post('/login', passport.authenticate('login', {
            successRedirect: '/auth/success',
            failureRedirect: '/auth/loginFailure'
        }))
    
    router.post('/register', passport.authenticate('register', {
            successRedirect: '/auth/success',
            failureRedirect: '/auth/regFailure'
        }))
    
    router.get('/signout', function(req, res) {
        /* The below is provided by passport. */
        req.logout();
        console.log('comes here 222')
        res.redirect('/');
    });
    
    router.get('/success', function(req, res) {
        console.log('come here? as success? ', req.body)
        res.send({state: 'success', user: req.user ? req.user : null});
    });

    router.get('/loginFailure', function(req, res){
        console.log('req ', req.message)
        console.log('res ', res.message)
        res.send({state: 'failure', user: null, message: "Invalid username or password"});
    });
    
    router.get('/regFailure', function(req, res){
        res.send({state: 'failure', user: null, message: "Username already exists. Choose another"});
    });
    
    return router;
}

