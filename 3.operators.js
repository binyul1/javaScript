//type conversion

const { type } = require("os");

//explicit/implicit- type coercing
const f ="23";
const g = Number(f);
console.log(parseInt(f));
console.log(String(g));
console.log(Boolean(g));

//type coercing
console.log(f +23);
console.log (f - 23);

//truthy and falsy values- give boolean value when converted to boolean
//falsy values- 0, "", undefined, null, NaN, false 
console.log(Boolean(0));
console.log(Boolean(""));
console.log(Boolean(undefined));
console.log(Boolean(null));
console.log(Boolean(NaN));
console.log(Boolean(false));
//except all number are truthy, even negative numbers
console.log(Boolean(-1));

console.log(Number("123rs"));
console.log(parseInt("123rs"));
console.log(parseFloat("123.12rs"));
console.log(Number("rs123rs"));


//typeof operator
console.log(typeof f);

a="";
if (typeof a === "string"){
    console.log("a is a string");
}

//ternary operator[condition ? statement_1 : statement_2]
//replacement of if-else statement
const age = 18;

const isAdult = age >= 18 ? "yes" : "no";
console.log(isAdult);

const res= age>=50 ?"Major" : age>=18 ? "Major" : "Minor";
console.log(res);
// ----------------------------------------------------------------------------------------------------------------
//Arimetic operators
//+, -, *, /, %, **, ++, --

//Increment and decrement operators
// ++, --
//preincrement
let i=10
//print and increment
console.log(++i) //11
//postincrement
//increment and print
console.log(++i)


//assignment operators
// =, +=, -=, *=, /=, %=, **=
//string concatenation operator
let name = "John";
let lastname = " Doe";
// name = name + lastname;
name += lastname;
console.log(name);

//comparison operators
// ==, ===, !=, !==, >, <, >=, <=
// value comparison and value with data type comparison

//value comparison
//<, >, <=, >=, ==, !=

//value with data type comparison
//!==, ===
let x=10;
let y="10";

console.log(x<y);//false
console.log(x>y); //false
console.log(x<=y); //true
console.log(x>=y); //true
console.log(x==y); //true
console.log(x===y); //false
console.log(x!=y); //false
console.log(x!==y); //true

//logical operators
// &&, ||, !
//console.log(( a <= b ) && true && true) //true
// console.log(( a <= b ) || true || true) //true
console.log(!true) //false

//conditional (ternary) operator mostly used in react js
// condition ? statement_1 : statement_2
const age1 = 18;
const isAdult1 = age1 >= 18 ? "yes" : "no";
console.log(isAdult1);

//Nullish coalescing operator(??)
let username = null;
//let defaultName = username !== null ? username : "Anonymous";
let defaultName = username ?? "Anonymous";
console.log(defaultName); // "Anonymous"


const numb1 = 0 || 100 //output 100 because 0 is falsy value
const numb2 = 0 ?? 100 //output 0 because nullish coalescing operator only considers null and undefined as nullish values
const numb3 = null || 100 //output 100 because null is falsy value

//Optional Chaining (?.)
let user = {
    name: "John",
    address: {
      street: "123 Main St",
      city: "New York",
    },
  };
console.log(user.address.city)  //output: New York
// console.log(user.phone.number) //error
console.log(user?.phone?.number) //output: undefined

//spread and rest operator
//Array or object 
let arr1= [1, 2, 3];
let arr2= [4, 5, 6];

const arr3=[...arr1, ...arr2];
console.log(arr3)

//copy operator
const userObj = {
    name: "",
    email: ""
}
const adminUser = {...userObj, role: "admin"};
console.log(adminUser)

//Destructing assignment
let userInfo = ['John', 'john@example.com', '123456', 23, "Bachelors"];
let [fullname, email, ...remaining] = userInfo;
console.log(fullname)
console.log(email)
console.log(remaining)
let [fullname1, , ...remaining1] = userInfo;
console.log(remaining1)


let productInfo = {
    name: "Laptop",
    price: 1000,
    quantity: 5,
    color: "black"
}

let {name:productName, price, ...rest} = productInfo;
console.log(productName)
console.log(price)
console.log(rest)

//Template literals operator
let emailTemplate= `hello ${fullname}
your email is ${email}`;
console.log(emailTemplate)


//controll statements
//if-else 