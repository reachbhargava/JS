var thirdModule = angular.module("thirdModule", [])

thirdModule.controller("thirdController", thirdController)

function thirdController($scope) {
    $scope.textString = "Siri";
    $scope.boolVal = true;
    $scope.radioOption = "laptop";
}