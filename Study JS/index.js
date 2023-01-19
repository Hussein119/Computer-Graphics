//let x = 5 + 2 + 3;
let length = 16;                               // Number
//let lastName = "Johnson";                      // String
let x0 = {firstName:"John", lastName:"Doe"};    // Object
//document.write(length,lastName,x.firstName,x.lastName);
let x1 = 16 + "Volvo";
//document.write(x1);
let x2 = "16" + "Volvo";
//document.write(x2);
const car = {type:"Fiat\t", model:"500\t", color:"white\t"};
//document.write(car.type,car.model,car.color);
const person = {
    firstName: "John",
    lastName : "Doe",
    id       : 5566,
    fullName : function() {
      return this.firstName + " " + this.lastName;
    }
  };
/*
 document.write(person.fullName); // function definition
 document.write("<br>");
 document.write(person.fullName()); // function behavior
 document.write("<br>");
*/
/*
 slice(start, end)
 substring(start, end)
 substr(start, length)
JavaScript counts positions from zero.
First position is 0.
Second position is 1.
 */
let str = "Apple, Banana, Kiwi";
let part = str.slice(7, 13);
//document.write('\nstring is \n',str);
//document.write('\nthe part is \n',part);
let part0 = str.slice(7); // start from 7 to the last 
//document.write(part0);
// If a parameter is negative, the position is counted from the end of the string. 
let part1 = str.slice(-12, -6);
//document.write('\nstring is \n', str1);
//document.write('\npart is \n', part1);
let part2 = str.substring(7, 13);
//document.write(part2);
// substring() is similar to slice().
//The difference is that start and end values less than 0 are treated as 0 in substring().
let part3 = str.substr(7); // it is working on the browser 
//document.write(part3);
let text = "Please visit Microsoft!";
let newText = text.replace("Microsoft", "W3Schools");
/*
document.write(text);
document.write("<br>");
document.write(newText);
document.write("<br>");
*/
/*
Note
The replace() method does not change the string it is called on.
The replace() method returns a new string.
The replace() method replaces only the first match
If you want to replace all matches, use a regular expression with the /g flag set. See examples below.
*/
// By default, the replace() method replaces only the first match: 
let text1 = "Please visit Microsoft and Microsoft!";
let newText1 = text1.replace("Microsoft", "W3Schools");
/*
document.write(text1);
document.write("<br>");
document.write(newText1);
document.write("<br>");
*/
// By default, the replace() method is case sensitive. Writing MICROSOFT (with upper-case) will not work: 
// To replace case insensitive, use a regular expression with an /i flag (insensitive):
let newText2 = text.replace(/MICROSOFT/i, "W3Schools");
/*
document.write(newText2);
document.write("<br>");
*/
// To replace all matches, use a regular expression with a /g flag (global match): 
let newText3 = text1.replace(/Microsoft/g, "W3Schools");
/*
document.write(newText3);
document.write("<br>");
*/
/*
Converting to Upper and Lower Case
A string is converted to upper case with toUpperCase():
A string is converted to lower case with toLowerCase():
*/
/*
JavaScript String concat()
concat() joins two or more strings:
*/
let text2 = "Hello";
let text3 = "World";
let text4 = text2.concat(" ", text2);
/*
text = "Hello" + " " + "World!";
text = "Hello".concat(" ", "World!");
Note
All string methods return a new string. They don't modify the original string.
Formally said: Strings are immutable: Strings cannot be changed, only replaced.
JavaScript String trim()
The trim() method removes whitespace from both sides of a string:
let text1 = "      Hello World!      ";
let text2 = text1.trim();
ECMAScript 2019 added the String method trimStart() to JavaScript.
The trimStart() method works like trim(), but removes whitespace only from the start of a string.
ECMAScript 2019 added the String method trimEnd() to JavaScript.
The trimEnd() method works like trim(), but removes whitespace only from the end of a string.
ECMAScript 2017 added two String methods: padStart() and padEnd() to support padding at the beginning and at the end of a string.
*/
let text5 = "5";
let padded = text5.padStart(5,"x"); // xxxx5 
//document.write(padded);
/*
Note
The padStart() method is a string method.
To pad a number, convert the number to a string first.
Note
The padEnd() method is a string method.
To pad a number, convert the number to a string first.
*/
let numb = 5;
let text6 = numb.toString();
let padded1 = text6.padStart(4,"0");
//document.write(padded1);
/*
Extracting String Characters
There are 3 methods for extracting string characters:

charAt(position)
charCodeAt(position)
Property access [ ]
*/
let text7 = "HELLO WORLD";
let char = text7.charAt(0);
//document.write(char);
/*
Note
Property access might be a little unpredictable:

It makes strings look like arrays (but they are not)
If no character is found, [ ] returns undefined, while charAt() returns an empty string.
It is read only. str[0] = "A" gives no error (but does not work!)

Converting a String to an Array
If you want to work with a string as an array, you can convert it to an array.
JavaScript String split()
A string can be converted to an array with the split() method:
text.split(",")    // Split on commas
text.split(" ")    // Split on spaces
text.split("|")    // Split on pipe


JavaScript Search Methods
String indexOf(), The indexOf() method returns the index of (the position of) the first occurrence of a specified text in a string 
String lastIndexOf(), The lastIndexOf() method returns the index of the last occurrence of a specified text in a string
Both indexOf(), and lastIndexOf() return -1 if the text is not found
Both methods accept a second parameter as the starting position for the search
ex: let str = "Please locate where 'locate' occurs!"; str.indexOf("locate", 15);
String startsWith(), The startsWith() method returns true if a string begins with a specified value, otherwise false 
The startsWith() method is case sensitive.
String endsWith(), The endsWith() method returns true if a string ends with a specified value, otherwise false
The endsWith() method is case sensitive.
Note
JavaScript counts positions from zero.
JavaScript String search()
The search() method searches a string for a specified value and returns the position of the match
Did You Notice?
The two methods, indexOf() and search(), are equal?
They accept the same arguments (parameters), and return the same value?
The two methods are NOT equal. These are the differences:
The search() method cannot take a second start position argument.
The indexOf() method cannot take powerful search values (regular expressions).

JavaScript String match()
The match() method searches a string for a match against a regular expression, and returns the matches, as an Array object.
ex : let text = "The rain in SPAIN stays mainly in the plain"; text.match(/ain/g); 
Note
If a regular expression does not include the g modifier (to perform a global search), the match() method will return only the first match in the string.


JavaScript Template Literals
Synonyms:

Template Literals
Template Strings
String Templates
Back-Tics Syntax

Back-Tics Syntax
Template Literals use back-ticks (``) rather than the quotes ("") to define a string
ex: let text = `Hello World!`;
With template literals, you can use both single and double quotes inside a string:
ex: let text = `He's often called "Johnny"`;
Template literals allows multiline strings
ex: let text =
`The quick
brown fox
jumps over
the lazy dog`;

Interpolation
Template literals provide an easy way to interpolate variables and expressions into strings.

The method is called string interpolation.

The syntax is: ${...} 

let firstName = "John";
let lastName = "Doe";

let text = `Welcome ${firstName}, ${lastName}!`; // output: Welcome John, Doe!


Automatic replacing of variables with real values is called string interpolation. 

Expression Substitution
Template literals allow expressions in strings: 
let price = 10;
let VAT = 0.25;

let total = `Total: ${(price * (1 + VAT)).toFixed(2)}`;

JavaScript has only one type of number. Numbers can be written with or without decimals.

JavaScript Numbers are Always 64-bit Floating Point

JavaScript numbers are always stored as double precision floating point numbers, following the international IEEE 754 standard.
This format stores numbers in 64 bits, where the number (the fraction) is stored in bits 0 to 51, the exponent in bits 52 to 62, and the sign in bit 63:
Value (aka Fraction/Mantissa)	            Exponent	                               Sign
52 bits (0 - 51)                    	11 bits (52 - 62)	                         1 bit (63)

Integer Precision
Integers (numbers without a period or exponent notation) are accurate up to 15 digits.
ex:let x = 999999999999999;   // x will be 999999999999999
   let y = 9999999999999999;  // y will be 10000000000000000

The maximum number of decimals is 17.

WARNING !!

JavaScript uses the + operator for both addition and concatenation.

Numbers are added. Strings are concatenated.

NaN - Not a Number
NaN is a JavaScript reserved word indicating that a number is not a legal number.

Trying to do arithmetic with a non-numeric string will result in NaN (Not a Number): 
let x = 100 / "Apple"; // NaN 
However, if the string contains a numeric value , the result will be a number:
let x = 100 / "10"; // 10 
You can use the global JavaScript function isNaN() to find out if a value is a not a number:
let x = 100 / "Apple";
isNaN(x);
Watch out for NaN. If you use NaN in a mathematical operation, the result will also be NaN, Or the result might be a concatenation like NaN5.

Division by 0 (zero) generates Infinity.
Infinity is a number : typeof Infinity; returns number 

JavaScript interprets numeric constants as hexadecimal if they are preceded by 0x. 
ex: let x = 0xFF; return : 255 

Never write a number with a leading zero (like 07).
Some JavaScript versions interpret numbers as octal if they are written with a leading zero.

By default, JavaScript displays numbers as base 10 decimals.

But you can use the toString() method to output numbers from base 2 to base 36.

Hexadecimal is base 16. Decimal is base 10. Octal is base 8. Binary is base 2.

The toString() method returns a number as a string.

toExponential() returns a string, with a number rounded and written using exponential notation. 
ex:
let x = 9.656;
x.toExponential() // by defult 3 
x.toExponential(2);
x.toExponential(4);
x.toExponential(6); 
output : 
9.656e+0
9.66e+0
9.6560e+0
9.656000e+0

let x = 9.656;
x.toFixed(0);
x.toFixed(2);
x.toFixed(4);
x.toFixed(6); 
output:
10
9.66
9.6560
9.656000

toFixed(2) is perfect for working with money.

toPrecision() returns a string, with a number written with a specified length
let x = 9.656;
x.toPrecision();
x.toPrecision(2);
x.toPrecision(4);
x.toPrecision(6);
output: 
9.656
9.7
9.656
9.65600

valueOf() returns a number as a number.
let x = 123;
x.valueOf();
(123).valueOf();
(100 + 23).valueOf();
output:
123
123
123

In JavaScript, a number can be a primitive value (typeof = number) or an object (typeof = object).

The valueOf() method is used internally in JavaScript to convert Number objects to primitive values.

There is no reason to use it in your code.

All JavaScript data types have a valueOf() and a toString() method.

Converting Variables to Numbers
There are 3 JavaScript methods that can be used to convert variables to numbers:

The Number() method
The parseInt() method
The parseFloat() method

Method	Description
Number()	Returns a number, converted from its argument.
parseFloat()	Parses its argument and returns a floating point number
parseInt()	Parses its argument and returns an integer 

If the number cannot be converted, NaN (Not a Number) is returned. 

The Number() method returns the number of milliseconds since 1.1.1970.

roperty	Description
MAX_VALUE	Returns the largest number possible in JavaScript
MIN_VALUE	Returns the smallest number possible in JavaScript
POSITIVE_INFINITY	Represents infinity (returned on overflow)
NEGATIVE_INFINITY	Represents negative infinity (returned on overflow)
NaN	Represents a "Not-a-Number" value


Creating an Array
Using an array literal is the easiest way to create a JavaScript Array.

Syntax:

const array_name = [item1, item2, ...];     

ex: 
const cars = ["Saab", "Volvo", "BMW"];
or
const cars = [];
cars[0]= "Saab";
cars[1]= "Volvo";
cars[2]= "BMW";
or
const cars = new Array("Saab", "Volvo", "BMW");
The two examples above do exactly the same.

There is no need to use new Array().

For simplicity, readability and execution speed, use the array literal method.

Arrays are Objects
Arrays are a special type of objects. The typeof operator in JavaScript returns "object" for arrays.

But, JavaScript arrays are best described as arrays.

You can also use the Array.forEach() function

Adding Array Elements 
The easiest way to add a new element to an array is using the push() method
New element can also be added to an array using the length property

WARNING !
Adding elements with high indexes can create undefined "holes" in an array:
const fruits = ["Banana", "Orange", "Apple"];
fruits[6] = "Lemon";  // Creates undefined "holes" in fruits

WARNING !!
If you use named indexes, JavaScript will redefine the array to an object.

After that, some array methods and properties will produce incorrect results.

const person = [];
person["firstName"] = "John";
person["lastName"] = "Doe";
person["age"] = 46;
person.length;     // Will return 0
person[0];         // Will return undefined

The Difference Between Arrays and Objects 

In JavaScript, arrays use numbered indexes.  
In JavaScript, objects use named indexes.
Arrays are a special kind of objects, with numbered indexes.

When to Use Arrays. When to use Objects.
JavaScript does not support associative arrays.
You should use objects when you want the element names to be strings (text).
You should use arrays when you want the element names to be numbers.

A Common Error
const points = [40];
is not the same as:
const points = new Array(40);


To solve this problem ECMAScript 5 (JavaScript 2009) defined a new method Array.isArray()
The instanceof operator returns true if an object is created by a given constructor



*/



/*
const fruits = ["Banana", "Orange", "Apple", "Mango"];
let fLen = fruits.length;

let text9 = "<ul>";
for (let i = 0; i < fLen; i++) {
  text9 += "<li>" + fruits[i] + "</li>";
}
text9 += "</ul>";
document.write(text9);
*/

var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");
ctx.moveTo(0, 0);
ctx.lineTo(200, 100);
ctx.stroke();