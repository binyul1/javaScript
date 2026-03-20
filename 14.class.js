// // Multiple -> not found in js
//   // (A, B, C) -> D

// // MultiLevel -> Allowed in js
// // A -> B -> C -> D
//   // top to bottom assignment 
//   // access 
//   // A <- B <- C <- D 

// class User {
//   name; // by default within in calss, everything has public access
//   #email;     // # defines private property for a class, private properies can be accessed only within self
//   address;


//   constructor(name, email, address) {
//     this.name = name
//     this.#email = email
//     this.address = address
//   }

//   getEmail() {
//     return this.#email
//   }

//   // setEmail(_email) {
//   //   this.#email = _email
//   // }
// }

// // User is a Super or Parent Class 
// // Admin is a Derived or child class
// class Admin extends User {
//   phone;
//   role = "admin";

//   // Constructor overriding
//   constructor(name, email, address, phone) {
//     // this
//     super(name, email, address); // parent constructor
//     this.phone = phone
//     // Error
//   }
// }


// const user = new User("Sandesh", "sandesh@broadwayinfosys.com", "Kathmandu")   // name, email, address

// const admin = new Admin("Sandesh", "sandesh@broadwayinfosys.com", "Kathmandu", 9876543210);   // name, email, address, phone, role = 'admin'

// // admin.phone = ""
// console.log(user)
// console.log(admin);





// class Editor extends User{
//   phone; 
//   role="editor"
//   // ...
// }



// // Application chat, Student , sessions 
// // 
// class Group {
//   name; 
// }

// class Chat {
//   group;      // Group class Object
//     // users assigned
// }

// class Sessions {
//   group;      // Group class Object
//     // students 
// }



/**
 * 
 * 
 * Db Layer 
 *  - CRUD (Create, Update, Read, Delete)
 *    - Mongodb 
 *  -> Object Define from Model Class, Save
 * 
 * 
 * * User Collection/Table
 * 
 * const userObj = new User(data)
 * await userObj.save()
 * 
 * Read 
 * User.find()
 * 
 * Banner
 * const bannerObj = new Banner(data)
 * await bannerObj.save()
 * 
 * 
 * Banner.find()
 * 
 * 
 */

class Database{
  constructor() {
    // db connection code 
  }

  createRow(className, data) {
    const obj = new className(data);

  }

  readAllRows() {
  }
}



class Banner extends Database {

}

const banner = new Banner()
banner.createRow(Banner, {})

class EmailService {
  // 
}


class User extends Database{
  emailSvc;

  // constructor() {
    // super()
  // }

  // createUser() {
  //   //
  // }
}

const user = new User()
user.createRow(User, {name: ""})
console.log(user);    //




// Create a Js class called Product
// assign name, price and discount
// Using oop, calculate and assign discount amount and after discount to the product object(inside class)
// And print the info of the product using object

class Product {
  name;
  price; 
  discount; 
  #discountAmt;
  afterDis;

  static detail = "This is product Detail";

  constructor(name, price, discount) {
    this.name = name; 
    this.price = price; 
    this.discount = discount

    this.#getDiscountAmount()
  }

  static getDetail() {
    return this.detail
  }

  #getDiscountAmount() {
    this.#discountAmt = this.price * this.discount / 100
    
    this.#getAfterDiscount()
  }

  #getAfterDiscount = () => {
    this.afterDis = this.price - this.#discountAmt
    // return this.afterDis;
    // console.log(this.afterDis)
  }
}

console.log(Product.detail)

// const prodObj = new Product("Name of Product", 1000, 10)
// prodObj.detail = ""
// prodObj.getDiscountAmount()
// prodObj.getAfterDiscount()

console.log(Product.getDetail())


// const math = new Math()
// Math.ceil()
// math.random()

// const date = new Date();
// date.getDate()


let userobj = {
  name: "Sandesh"
}


// Product.prototype.method

// console.log(userobj.fullname)
// Es5, es6

function UserProfile(name, email) {
  // constructror 
  this.name = name
  this.email = email
}


// prototype
// UserProfile.prototype.getUserProfile = () => {
UserProfile.prototype.getUserProfile = function(){
  // limited scope
  console.log("Name: ", this.name)      // Name: undefined
}

const userProfileObj = new UserProfile("Sandesh Bhattarai", "sandesh@broadwayinfosys.com")
// console.log(userProfileObj)
userProfileObj.getUserProfile()


// Compile run