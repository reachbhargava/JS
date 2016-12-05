(function() {    
    var myModule = angular.module("myModule");
    
    myModule.service("analysisSvc", analysisSvc);
    
    function analysisSvc($http) {
        
        this.callServiceToAnalyze = function(urlEntered) {
            var obj = {requestURL: urlEntered}
            var urlInJSON = angular.toJson(obj, true);
            return $http.post("http://localhost:3000/analyzeUrl", urlInJSON)
        }
    }
})()