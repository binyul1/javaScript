//Timer -2types
       //set timeout and set interval
//file operation
//Db operations
//http request (Api calls)


console.log (1);
console.log (2);
//async 
setTimeout (() => {
    console.log(3)
},1000);


//setInterval()
//always repeat after 1 second
//no closer
// setInterval (() => {
//     console.log(3)
// },1000);
//how to end this interval
//clearInterval(interval)
//clearTimeout(timeout)


console.log (4);
console.log (5);


const prom = new Promise( (resolve, reject) => {
    //code executed => 2 state
        //success/fulfilled
        //failure/rejected
    //res('Data')
    //rej('exception')
} )

//prom => Resolved
//prom => Rejected

//every function which returns the promis is async function
//any function if is async , it returns promise object

const login = (username, password) => {
    // function return type => promise
    //login Logic
    return new Promise((res, rej)=>{
        //admin, admin
        if(username === "admin" && password === "admin"){
            res("Login Success")
        }else{
            rej("Login Failed")
        }
    });
};

const login1 = async(username, password) => {
    if(username === "admin" && password === "admin"){
    //resolved
            return {msg: "Login Success"}
    }else{
        throw {msg:"Login Failed"}
    }
};

const loginRet = login1("admin", "admin")
//promise handling 2 ways
//1. then catch
loginRet.then((resolveData) => {
    console.log(resolveData);
    console.log(resolveData.msg);
}).catch((exception)=>{
    console.log(exception)
}).finally( () => {
    console.log("i am always executed")
})

// console.log(loginRet)

// const rejEx = login("admin", "admin")
// console.log(rejEx)