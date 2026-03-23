// Object Oriented Programming
// Classes and Objects
// Person - Binyul
// name, email, age

// car (Class)
// make, model, year

// bike (Class)
// make, model, year

//i10(object)

//bmw(object)


class Car {
  //scope of a class
  //data, functions
  color;
  engine;
  seat;
  model;
  makeYear;

  constructor(clr, engine, seat, model, makeYear) {
    this.color = clr;
    this.engine = engine;
    this.seat = seat;
    this.model = model;
    this.makeYear = makeYear;
    console.log("i am always execute when object is built");
  }

  //functions
  startEngine() {}
  applyBreak = () => {};
}

const carObj = new Car("red", "diesel", 4, "i10", 2020);
const carObj1 = new Car("yellow", "petrol", 7, "i20", 2025);
console.log(carObj);
console.log(carObj1);

