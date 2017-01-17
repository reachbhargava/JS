var app = angular.module('chirpApp', ['ngRoute', 'ngResource']).run(function($rootScope, $http, $location) {
    $rootScope.authenticated = false
    $rootScope.current_user = ''
    
    $rootScope.logout = function() {
        $http.get('/auth/signout')
            .then(function(response) {
                console.log('Signed out')                
            }, function(response) {
                console.log('Error signing out')
            })
        $rootScope.authenticated = false
        $rootScope.current_user = ''
        $location.path('#/login')
    }
})

app.controller('mainController', mainController);
app.controller('authController', authController)

app.config(function($routeProvider){
  $routeProvider
    //the timeline display
    .when('/', {
      templateUrl: 'main.html',
      controller: 'mainController as main'
    })
    //the login display
    .when('/login', {
      templateUrl: 'login.html',
      controller: 'authController as login'
    })
    //the signup display
    .when('/register', {
      templateUrl: 'register.html',
      controller: 'authController as auth'
    });
});

app.service('postService', postService)

function postService($http) {
    this.getAll = function() {
        return $http.get('/api/bhargava/posts')
    }
}

app.service('resourceService', resourceService)
function resourceService($resource) {
    return $resource('/api/bhargava/posts/:id');
}

function mainController(postService, resourceService, $rootScope) {
	this.posts = resourceService.query();
	this.newPost = getMeNewPost()
    var self = this;
    
    this.post = function() {
		this.newPost.created_at = new Date()
		this.newPost.created_by = $rootScope.current_user
        resourceService.save(this.newPost, function() {
            self.posts = resourceService.query();
            self.newPost = getMeNewPost()
        })
	}

	function getMeNewPost() {
		return {created_by: '', text: '', created_at:''}
	}
}

function authController($http, $rootScope, $location) {
  this.user = {username: '', password: ''};
  this.error_message = '';
    var self = this
    
  this.login = function() {
    
    $http.post("/auth/login", self.user)
        .then(function(response) {
            $rootScope.authenticated = true
            $rootScope.current_user = response.data.user.username
            $location.path('/')
        }, function(error) {

        })
    this.error_message = 'login request for ' + this.user.username;
  };

  this.register = function() {
    $http.post("/auth/signup", self.user)
        .then(function(response) {
            $rootScope.authenticated = true
            $rootScope.current_user = response.data.user.username
            $location.path('/')
        }, function(error) {

        })
    this.error_message = 'registeration request for ' + this.user.username;
  };
}