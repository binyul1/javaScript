//ES-6 - ecma standard  .js,.jsx,.cjs(es5 ~ .js),.mjs(es6)
//export
class User {
    getSingleUserFilter (filter){
        //db: query extue
    }
}

// const userObj = new User();

//es5 export
// module.exports = User
// module.export = {
//     user,
//     userObj
// };

//es6 export 
//named export
export const userObj = new User();

//default export
export default new User();

//

//execution

//es5 ->es6 - .mjs path should be mention
//es6 -> es5 - .cjs


// develop a function in a file ->utils.js
    //to print numbers multilies of n till 10 in following format
    //n=2
    //2*1=2
    //2*2=4 
    //2*3=6
    //2*4=8
    //.....
    //2*10=20

//use function in multiples.js file to print in the given format
