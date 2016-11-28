var calculatorModule = angular.module("calculatorModule", [])

calculatorModule.controller("controller", controller)

function controller() {
    this.operation = function (op) {
        console.log('coming here ', op)
        this.symbolChosen = op
        if (this.firstNumber && this.secondNumber) {
            var result;
            switch (op) {
                case '+':
                    result = parseFloat(this.firstNumber) + parseFloat(this.secondNumber)
                    break;
                case '-':
                    result = this.firstNumber - this.secondNumber
                    break;
                case '*':
                    result = this.firstNumber * this.secondNumber
                    break;
                case '/':
                    result = this.firstNumber / this.secondNumber
                    break;
                default:
                    console.log('Operation Not Supported')
                    result = "Operation Not Supported";
            }
            this.result = result
        }
    }
}