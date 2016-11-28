(function() {
    var contactsApp = angular.module("contactsApp")

    contactsApp.controller("contactsController", contactsController)
    function contactsController(getDataSvc) {
        var self = this;
        this.editMode = false;
        this.addMode = false;
        
        this.fetchContactsList = function() {
            var promise = getDataSvc.getDataFromWSCall();
            promise.then(function(data) {
                self.contacts = data.data;
                self.selectedContact = self.contacts[0]
            })
        }
        
        this.fetchContactsList();
        
        

        this.showUser = function(index) {
            this.selectedContact = this.contacts[index]
            this.successMessage = null;
            this.errorMessage = null;
        }
        
        this.toggleEditMode = function() {
            self.editMode = !this.editMode;
        }
        
        this.save = function() {
            /* Saving, so edit is false. */
            self.editMode = false;
                        
            if(self.addMode == true) {
                var createPromise = getDataSvc.createUser(this.selectedContact)
                createPromise
                    .then(function(response){
                        self.successMessage = "Data saved successfully."
                        self.fetchContactsList();
                    }, function(response) {
                        self.errorMessage = "Internal Error, Try again later."
                    })
                self.addMode = false;
                /* Refresh contacts on the left side. */
                
            } else {
                var savePromise = getDataSvc.updateUser(this.selectedContact)
                savePromise
                    .then(function(response){
                        self.successMessage = "Data saved successfully."  
                    }, function(response) {
                        self.errorMessage = "Internal Error, Try again later."
                    })
            }
            
        }
        
        this.addContact = function() {
            this.selectedContact = {}
            this.selectedContact.id = this.contacts.length + 1
            this.editMode = true;
            this.addMode = true;
        }
        
        this.delete = function() {
            var deletePromise = getDataSvc.deleteUser(this.selectedContact)
            deletePromise
                    .then(function(response){
                        self.successMessage = "User Data Deleted."
                        self.fetchContactsList();
                    }, function(response) {
                        self.errorMessage = "Internal Error, Try again later."
                    })
        }
    }
})()