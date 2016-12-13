(function() {
    var app = angular.module('app')

    app.controller("loginController", loginController)

    function loginController($http, $location, $rootScope) {
        var login = this;
        login.error_message = '';
        login.user = {username: '', password:''};
        
        login.loginMethod = function() {
//            console.log('Login Details entered ', login.user);
            $http.post('/auth/login', login.user).then(function(response) {
//                console.log('came back from login ', response)
                if (!response.data.user) {
                    login.error_message = response.data.message
                } else {
                    $rootScope.current_user = response.data.user.name;
                    $rootScope.authenticated = true;
                    $location.path('/home');
                }                
            }, function(errorResponse) {
                console.log('Unable to login', errorResponse)
                login.error_message = errorResponse.data;
            });
        
        }
        
        login.registerMethod = function() {
//            console.log('Registering Details entered ', login.user);
            $http.post('/auth/register', login.user).then(function(response) {
//                console.log('came back from register ', response)
                if (!response.data.user) {
                    login.error_message = response.data.message
                } else {
                    $rootScope.current_user = response.data.user.name;
                    $rootScope.authenticated = true;
                    $location.path('/home')
                }
            }, function(errorResponse) {
                console.log('Unable to register', errorResponse)
                login.error_message = errorResponse.data;
            });
        
        }
        
    }
})();