var moreDirectivesModule = angular.module("moreDirectivesModule", [])

moreDirectivesModule.controller("controller", controller)

function controller() {
    this.checked = true;
    
    this.listOfNumbers = [
        {name: 'bhargava', gender: 'male'},
        {name: 'siri', gender: 'female'},
        {name: 'XXX', gender: 'female'}
    ]
}