// Array of objects
// map(), filter(), reduce(), some(), every(), find(), findIndex(), Foreach()
let a = 10; //globalscope , let and var(only global)

// Hosting
const result1 = addTwoNumbers(10, 20);
console.log(result1); //30

//general function defination
function addTwoNumbers(a, b) {
  // block scope/function scope
  //parameter a and outside a are different
  let c = a + b;
  return c; //optional,last statement of the function
  //noscope
}
//
//
const result = addTwoNumbers(10, 20);
console.log(result); //30

//arrow function
const sunTwoNumbers = (a, b) => {
  let c = a + b;
  return c;
};
const result2 = sunTwoNumbers(10, 20);
console.log(result2);

//Js Task,
//develop js function to sum the numbers up to n
//e.g. function(10) => 1+2+3....+10 => return
// const sumofN = function (n) {}
const sum = (n) => {
  let x = 0;
  for (i = 1; i <= n; i++) {
    x += i;
  }
  return x;
};

console.log(sum(10));

//functions to object
let calculator = {
  //sum : (a,b) => {
  //arrow function
  //}
  sum(a, b) {
    //general function
  },
};

calculator.sum(10, 20);

//camelCase => function, variables,
//snake_case => database properties,
//kebeb-case => files and folders
//StudlyCaps => Class Name

console.log(a);

const addTwoNumber1 = (a, b = 0) => {
  const c = a + b;
  return c;
};

console.log(addTwoNumber1(10, 20)); //30
console.log(addTwoNumber1(10)); //Nan

//ES => ECMA Scripts
// ES5, ES6 = 2015 <

//global scope
a = 10;
let b = 20;

const addTwoNumber2 = () => {
  const c = a + b;
  return c;
};

console.log(addTwoNumber2());

//Types
//clouser and callback
