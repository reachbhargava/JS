(function() {
    var app = angular.module('app', ['ngRoute']).run(function($rootScope, $http, $location) {
        $rootScope.authenticated = false
        $rootScope.current_user = ''
    
        $rootScope.logout = function() {
            $http.get('/auth/signout')
                .then(function(response) {
                    console.log('Signed out')                
                }, function(response) {
                    console.log('Error signing out')
                })
            $rootScope.authenticated = false;
            $rootScope.current_user = '';
            $location.path('#/');
        }
})

    app.config(function($routeProvider) {
        $routeProvider
            .when("/", {
                templateUrl : "login.html",
                controller: 'loginController',
                controllerAs: 'login'
            })
            .when("/home", {
                templateUrl : "home.html",
                controller: 'homeController',
                controllerAs: 'home'
            })
            .when("/register", {
                templateUrl : "register.html",
                controller: 'loginController',
                controllerAs: 'register'
            })
            .otherwise('/');
    });
    
})();