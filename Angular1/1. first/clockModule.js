var myModule = angular.module("myClock", []);
        
myModule.controller("clockController", clockController)
function clockController($scope) {
    $scope.currentTime = new Date().toTimeString()
    
    $scope.updateTime = function() {
        $scope.currentTime = new Date().toTimeString()
    }
    
}