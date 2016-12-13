(function() {
    var app = angular.module('app')

    app.controller("homeController", homeController)

    function homeController($http) {
        var home = this;
        home.greeting = "GET LOST HOPELESS FELLOW";
        home.users = [];
        home.addUser = false;
        home.detailed = false;

        home.getUsers = function() {
            $http.get('/api/users').then(function(response) {
                home.users = response.data;
            })
        }
        home.getUsers();

        home.edit = function(user) {
            var users = home.users
            users.forEach(function(userInList) {
                userInList.editing = false;
            })
            user.editing = true;
        }

        home.update = function(user) {
            if (user && user.name && user.age) {
                $http.put('/api/users', user).then(function(response) {
                    home.getUsers();
                })
            } else {
                console.log('Cannot Update user')
            }
        }

        home.delete = function(user) {
            if (user) {
                $http.delete('/api/users/' + user._id).then(function(response) {
                    home.getUsers();
                })
            }
        }

        home.add = function(user) {
            console.log(user);
            home.addUser = !home.addUser;
            if (user && user.name && user.age) {
                $http.post('/api/users', user).then(function(response) {
                    home.getUsers();
                })
            } else {
                console.log('Not all data, cannot create user.')
            }        
        }

        home.showDetails = function(user) {
            home.detailedUser = user;
            home.detailed = true;
        }
    }
})();