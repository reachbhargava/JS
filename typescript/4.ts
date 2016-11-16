/*

Teacher: codedamn, Mehul (youtube)
TypeScript is an easier way of writing JS. Below are things that I did.
1. Downloaded TypeScript plugin for Sublime (into the packages folder of sublime)
2. Save a file as .ts and do a Cntrl + B and the file is built to a JS
3. This JS is used in the html like anyother standard JS file.

*/

var flag:boolean = false;
flag = true;

var num:any[] = [1,2,3, "bhargav"]

enum constants {
	pi = 3.14,
	chi = 9.0
}

console.log("circumference is ", 2 * constants.pi * 5)

/////////////////////////////////////////////////////////////////

function areaOfEllipse(r1:number, r2:number = r1):number {
	return Math.PI * r1 * r2
}

console.log("area of ellipse is ", areaOfEllipse(2, 1));
console.log("area of circle is ", areaOfEllipse(2));

function areaOfSquare(side:number, returnInteger?:boolean):number {
	if (returnInteger) {
		return Math.floor(side * side);
	}
	return side * side;
}

console.log("Area of Square ", areaOfSquare(4.1))
console.log("Area of Square ", areaOfSquare(4.1, true))

/////////////////////////////////////////////////////////////////

interface operateInterface {
	shape: string,
	side: number
}

function operate(x:operateInterface):number {
	return x.side * x.side
}

console.log("calling operate ", operate({shape:"square", side:10}));

interface player {
	run():void,
	addLives(num:number): void,
	score():number
}

function createPlayer():player {
	return {
		run: function() {},
		addLives: function(num:number) {},
		score: function() {return 100}
	}
}

var player1 = createPlayer();
var player2 = createPlayer();

// You cannot instantiate from an interface.
/////////////////////////////////////////////////////////////////

class website {
	url: string;
	domainOwner: string

	constructor(url, domainOwner) {
		this.url = url,
		this.domainOwner = domainOwner
	}

	someFunctionInTheClass():string {
		return this.domainOwner + "some Other String Attached"
	}
}

var google = new website("http://google.com", "Google Inc")

console.log('calling a method on the object ', google.someFunctionInTheClass());

// Only one constructor allowed.
/////////////////////////////////////////////////////////////////

class rectangle {
	side1: number;
	side2: number;

	constructor(side1: number, side2:number) {
		this.side1 = side1,
		this.side2 = side2
	}

	get area():number {
		return this.side1 * this.side2
	}

}

var myRect = new rectangle(10, 20);
console.log('are of the rectangle is ', myRect.area)

// The area could be calculated in the constructor and set with area being
// another variable in the class. But this has 2 problems
// a. Area can be directly set by the user to some junk
// b. Area since is calculated by constructor, if side is changed,
// won't reflect.
// That is why have a getter method
/////////////////////////////////////////////////////////////////
