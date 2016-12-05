(function() {    
    var myModule = angular.module("myModule");

    myModule.controller("LoginController", function($scope) {

        $scope.login = function() {
            /* Please change client_id based on your settings. */
            var client_id = 'e21e6d9508adad8'
            
            window.location.href = "https://api.imgur.com/oauth2/authorize?client_id=" + client_id + "&response_type=token"
        }

    })
})()