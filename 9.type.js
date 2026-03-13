//only on Array or Objects
// Array Datatype
let studentList = [
  {
    name: "student one",
    email: "one@student.com",
    score: 350,
  },
  {
    name: "student two",
    email: "two@student.com",
    score: 310,
  },
  {
    name: "student three",
    email: "three@student.com",
    score: 50,
  },
  {
    name: "student four",
    email: "four@student.com",
    score: 250,
  },
  {
    name: "student five",
    email: "five@student.com",
    score: 250,
  },
];

//percentage and division based on score
//map, forEach, filter, reduce, some, every

//FOR EACH
//syntax
////array.forEach((value[, index]) => {
//foreach body
//doesnt return
//});
//map EACH
//syntax
////array.map((value[, index]) => {
//foreach body
//returns
//});

const getDivision = (per) => {
  if (per >= 80) {
    return "Distinction";
  } else if (per >= 60) {
    return "First Division";
  } else if (per >= 40) {
    return "Second Division";
  } else {
    return "Fail";
  }
};

studentList.forEach((std) => {
  std.precentage = (std.score / 500) * 100;
  std.division = getDivision(std.precentage);
});

console.log(studentList);

let result = studentList.map((std) => {
  std.precentage = (std.score / 500) * 100;
  std.division = getDivision(std.precentage);
  return std;
});

console.log(result);
console.log(studentList);

//limitation of foreach
//1. cannot return value
//2. cannot break

////filter
//syntax
////array.filter((value[, index]) => {
//filter body
//returns boolean
//});

let stdDistinction = studentList.filter((std) => std.percentage >= 80);

console.log(stdDistinction);

//create an array of atleast 10 product information with name, price, discount(percentage)
//using forEach,map find the discount amont and after discount price using custom functions
//filter out the products with discount price less than 1000

let productInfor = [
  {
    name: "product one",
    price: 1000,
    discount: 10,
  },
  {
    name: "product two",
    price: 2000,
    discount: 20,
  },
  {
    name: "product three",
    price: 3000,
    discount: 30,
  },
  {
    name: "product four",
    price: 4000,
    discount: 40,
  },
  {
    name: "product five",
    price: 5000,
    discount: 50,
  },
  {
    name: "product six",
    price: 6000,
    discount: 60,
  },
  {
    name: "product seven",
    price: 7000,
    discount: 70,
  },
  {
    name: "product eight",
    price: 8000,
    discount: 80,
  },
  {
    name: "product nine",
    price: 9000,
    discount: 90,
  },
  {
    name: "product ten",
    price: 10000,
    discount: 100,
  },
];

let disAmount = productInfor.map((prod) => {
  prod.discountAmount = (prod.price * prod.discount) / 100;
  prod.discountedPrice = prod.price - prod.discountAmount;
  return prod;
});

let disProd = productInfor.filter((prod) => prod.discountAmount < 1000);

console.log(productInfor);
console.log(disProd);

//reduce function
//studentsList.reduct(() => {},{});
numbs = [1, 2, 3, 4, 5];
let res = numbs.reduce((acc, curr) => {
  console.log({ acc, curr });
  return acc + curr;
}, 0);
console.log(res);

//asyncronous programing
//asyncronous promise handling
