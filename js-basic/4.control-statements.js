//controll-flow statements

//conditionals
if (false) {
    console.log("1");
} 
console.log("2");

//switch-case statement
const day = 5;
switch (day) {
    case 3:
    case 4:
    case 5:
    case 6:
    case 2:
        console.log("weekdays");
        break;
    case 1:
    case 7:
        console.log("weekend");
        break;
    default:
        console.log("Invalid day");
        break;
}

//!loops
//while loop
//!while (condition) {
// !   //code to be executed
//!}
let i=10
while (i > 0) {
    console.log(i);
    i--;
}


//do while loop
let j = 10;
do {
    console.log(j);
    j--;
}while (j > 0);


//for loop
for (let k = 0; k < 10; k++) {
    console.log(k);
}


//for-in loop
//for of loop
//functions
 