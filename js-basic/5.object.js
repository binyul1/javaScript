Object
// // person
//  let person_name=" "
//  let person_age=20
// new keyword
let obj = new Object();

// object literal
let person = {
  name: "John",
  email: "john@example.com",
  pass: "123456",
};

//reading object properties
//dot notation
// let name=person.name;
// console.log(person.name)
// console.log(person);
// console.log(name);


//bracket notation []

// console.log(person['email'])

// console.log(person['user pass'])

let key="age";

// console.log(person[key])


person.age = 23
//adding new properties to an object

person['key']= 25;
person.education = "Bachelors"

//modifying existing properties
person.name = "Jone Doe"

//deleting proerties from an object
// delete person['user pass']

//destructuring objects
let person2 = {
  name: "John",
  email: "john@example.com",
  pass: "123456",
};
// let name = person.name;
// let email = person.email;
// let age = person.age;

let {name, email}=person;
let {name:user_name, email:user_email}=person2;


console.log(user_name,user_email)
console.log(person)

//rest operator
// let {name:user_name, ...rest}=person2;
// console.log(rest)