(function() {
    var contactsApp = angular.module("contactsApp")

    contactsApp.factory("factoryService", factoryService);
    function factoryService(valueSvc) {
        var returnObject = {}
        returnObject.name = valueSvc.name
        returnObject.author = valueSvc.author
        returnObject.title = "Some title for the book"
        return returnObject;
    }

    contactsApp.service("serviceService", serviceService);
    function serviceService(valueSvc) {
        // Constructor mode invocation. So this is used implicitly.
        this.name = valueSvc.name
        this.author = valueSvc.author
        this.title = "Some title for the book"
        // No return of 'this' in constructor mode.
    }
})()