(function() {
    var contactsApp = angular.module("contactsApp")

    contactsApp.service("getDataSvc", getDataSvc);
    function getDataSvc($http) {
        var self = this;
        
        this.getDataFromWSCall = function() {
            return $http.get("http://localhost:3000/contacts")
        }
        
        this.updateUser = function(userdata) {
            return $http.put("http://localhost:3000/contacts/" + userdata.id, userdata)
        }
        
        this.createUser = function(userdata) {
            return $http.post("http://localhost:3000/contacts", userdata)
        }
        
        this.deleteUser = function(userdata) {
            return $http.delete("http://localhost:3000/contacts/" + userdata.id, userdata)
        }
    
    }
})()