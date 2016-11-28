var helloModule = angular.module("helloModule", [])

helloModule.controller("helloController", helloController)

function helloController() {
   this.helloMessage = 'I am coming from the helloModule & helloController';
}