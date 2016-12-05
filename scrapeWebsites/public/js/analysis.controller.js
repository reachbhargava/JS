(function() {    
    var myModule = angular.module("myModule")
    
    myModule.controller("myController", myController)

    function myController(analysisSvc) {

//            this.urlEntered = 'https://www.google.de/'
//            this.urlEntered = 'http://www.blueprintcss.org/tests/parts/sample.html'
        this.urlEntered = 'https://www.fb.com/'
//            this.urlEntered = 'https://www.facok.co'
//            this.urlEntered = 'http://google.com/404'

        this.showError = false;
        this.showResult = false;

        this.analyze = function() {
            console.log('this.urlEntered ', this.urlEntered)
            self = this;                
            analysisSvc.callServiceToAnalyze(this.urlEntered)
                .then(function(res) {
                    placeResultsForDisplay(res, self)
                })
        }
        
        function placeResultsForDisplay(res, self) { 
            var finalResult = displayResults(res)
            if (finalResult.Error || finalResult['Response-Code']) {
                self.showError = true
                self.showResult = false
                self.responseErrorCode = finalResult['Response-Code']
                self.error = finalResult.Error
            } else {
                self.headingsAfterParse = finalResult.Headers
                delete finalResult.Headers
                self.headingsAfterParseArray = Array.from(self.headingsAfterParse)
                self.finalResult = finalResult
                self.showResult = true
                self.showError = false
            }
        }
    }

    function displayResults(res) {
        var result = angular.fromJson(res)
        var headings = result.data.headings;
        var headingsAfterParse = new Map(angular.fromJson(headings))

        var rest = result.data.rest;
        var finalResult = angular.fromJson(rest)
        finalResult.Headers = headingsAfterParse
        console.log('finalResult ', finalResult)
        return finalResult;
    }

})()