(function() {
    var myModule = angular.module("myModule", ['ui.router']);
 
    myModule.config(function($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('login', {
                url: '/login',
                templateUrl: 'templates/login.html',
                controller: 'LoginController'
            })
            .state('secure', {
                url: '/secure',
                templateUrl: 'templates/hello.html',
                controller: 'SecureController'
            });
        $urlRouterProvider.otherwise('/login');
    })

    myModule.controller("SecureController", function() {
        var imgurData = JSON.parse(window.localStorage.getItem("imgur"))
        this.accessToken = imgurData.oauth.access_token
        this.name = imgurData.oauth.account_username
    })
    
    require('./login.controller.js');
    require('./analysis.controller.js');
    require('./analysis.service.js');
//        <script src="js/login.controller.js"></script>
//        <script src="js/analysis.controller.js"></script>
//        <script src="js/analysis.service.js"></script>
        
})()