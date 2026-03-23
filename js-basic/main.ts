//only on es6
//ts, tsx
console.log("Hello world")  

let fullName: string= "Binyul";
// fullName= 123

let a: string;
let b: number;
let c: boolean;
let d: null;
let e: undefined;
let f: unknown;
let g: Function;

// array
// tuple, Array
let h: [string,string,string] = ["user", "admin", "guest"]

//union
let i: string | boolean = true

// Array
let j: Array<string | number | boolean> = [123, "asdf", true]

//object
// interface
interface IUser{
    name: string,
    email: string,
    address: string,
    phone? : string  
}


//type (function)

type UserType = {
    name: string;
    email: string;
    address: string;
    phone? : string; //optional property 
}
let k: IUser= {
    name: "",
    email: "",
    address: ""
}

let l : UserType = {
    name: "",
    email: "",
    address: ""
}

k.phone = "123"

//any


function functionName (a:any, b:any):any{
    return a + b
}

// async function asyncfunction(): Promise<string>{       //return promise
//     return""
//     //throw ""
// }

function sum<T>(a,b): T{
    return a + b
}

sum<number> (1, 2)
sum<string> ("a","b")

try{

} catch (exception:any){

}