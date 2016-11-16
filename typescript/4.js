var flag = false;
flag = true;
var num = [1, 2, 3, "bhargav"];
var constants;
(function (constants) {
    constants[constants["pi"] = 3.14] = "pi";
    constants[constants["chi"] = 9] = "chi";
})(constants || (constants = {}));
console.log("circumference is ", 2 * constants.pi * 5);
/////////////////////////////////////////////////////////////////
function areaOfEllipse(r1, r2) {
    if (r2 === void 0) { r2 = r1; }
    return Math.PI * r1 * r2;
}
console.log("area of ellipse is ", areaOfEllipse(2, 1));
console.log("area of circle is ", areaOfEllipse(2));
function areaOfSquare(side, returnInteger) {
    if (returnInteger) {
        return Math.floor(side * side);
    }
    return side * side;
}
console.log("Area of Square ", areaOfSquare(4.1));
console.log("Area of Square ", areaOfSquare(4.1, true));
function operate(x) {
    return x.side * x.side;
}
console.log("calling operate ", operate({ shape: "square", side: 10 }));
function createPlayer() {
    return {
        run: function () { },
        addLives: function (num) { },
        score: function () { return 100; }
    };
}
var player1 = createPlayer();
var player2 = createPlayer();
// You cannot instantiate from an interface.
/////////////////////////////////////////////////////////////////
var website = (function () {
    function website(url, domainOwner) {
        this.url = url,
            this.domainOwner = domainOwner;
    }
    website.prototype.someFunctionInTheClass = function () {
        return this.domainOwner + "some Other String Attached";
    };
    return website;
}());
var google = new website("http://google.com", "Google Inc");
console.log('calling a method on the object ', google.someFunctionInTheClass());
// Only one constructor allowed.
/////////////////////////////////////////////////////////////////
var rectangle = (function () {
    function rectangle(side1, side2) {
        this.side1 = side1,
            this.side2 = side2;
    }
    Object.defineProperty(rectangle.prototype, "area", {
        get: function () {
            return this.side1 * this.side2;
        },
        enumerable: true,
        configurable: true
    });
    return rectangle;
}());
var myRect = new rectangle(10, 20);
console.log('are of the rectangle is ', myRect.area);
