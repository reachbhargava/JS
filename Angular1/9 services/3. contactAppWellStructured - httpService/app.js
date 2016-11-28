(function() {
    var contactsApp = angular.module("contactsApp", [])

    contactsApp.controller("headerController", headerController)
    contactsApp.controller("footerController", footerController)

    function headerController(factoryService) {
        this.headerVal = factoryService.name;
        this.author = factoryService.author;
    }

    function footerController(serviceService) {
        this.footerVal = serviceService.name;
        this.author = serviceService.author;
    }
})()