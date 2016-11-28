(function() {
    var contactsApp = angular.module("contactsApp")

    contactsApp.controller("contactsController", contactsController)
    function contactsController(getDataSvc) {
        this.contacts = getDataSvc.contacts;

        this.selectedContact = this.contacts[0]

        this.showUser = function(index) {
            this.selectedContact = this.contacts[index]
        }
    }
})()