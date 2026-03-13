let studentsList = [
  {
    name: "Studen One",
    email: "one@gmail.com",
    address: "Kathmandu",
    phone: 9823098140,
  },
  {
    name: "Studen Two",
    email: "two@gmail.com",
    address: "Kathmandu",
    phone: 9823098141,
  },
  {
    name: "Studen Three",
    email: "three@gmail.com",
    address: "Kathmandu",
    phone: 9823098142,
  },
];

//table, list view, grid
// for (let i = 0; i < studentsList.length; i++) 
//i as a index

// for (let i in studentsList) {
// let student= studentsList[i]
// for in access index
// for of access array value

for (let student of studentsList) {
  console.log("Name:", student.name);
  console.log("Email:", student.email);
  console.log("Address:", student.address);
  console.log("Phone:", student.phone);
  console.log("**********************");
}
