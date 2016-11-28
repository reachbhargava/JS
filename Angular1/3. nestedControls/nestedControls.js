var nestedControllerModule = angular.module("nestedControllerModule", [])

nestedControllerModule.controller("controller1", controller1)
nestedControllerModule.controller("controller2", controller2)

function controller1($scope) {
    $scope.testText = "From Controller 1"
}

function controller2($scope) {
    $scope.testText = "From Controller 2"
}