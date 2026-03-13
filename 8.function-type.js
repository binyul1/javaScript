//recursive function
//without any loop print 1-100
const printUptoN = (n) =>{
    if (i <= n){
        console.log(i)
        i++;
        printUptoN(n);
    }
}
let i = 1;
printUptoN(10);

//function can take any things as input (parameter) and can return any things as output
//Clouser (lexical scope)
//Generator Function
//Callback
//IIFE function(Immediately inokable function Expression) 

//Clouser function
const func1 = () => {
    let x =  10;
    console.log(x);
    const func2 = () => { 
        console.log("value of x ", x)
    }
    return func2;
}
let res = func1();
res();

//Generator Function
function* printVal(){
    let i = 1;
    while (true){
        yield i++
    }
}
const getVal = printVal()
console.log(getVal.next().value)
console.log(getVal.next().value)
console.log(getVal.next().value)
console.log(getVal.next().value)

//callBack function
const func2 = () =>{
    console.log("callback function2")
}

const func = (callback) => {
    //body of func
    //const func2 = () => {
    //    console.log("callback function")
    //}
    callback();
}

const func3 = (cb) => {
    cb();
}

// <button onClick ={jsfunc}></button>
// func ( args, args , (error, result) => {})
//app.use ('/route', ()=> {})
//axios.get ('/',{}, (resposnse) => {})

func (func2)
func3 (func2)

// const func 4 = () => {}
func (() => {})


//events
//DOM manuplation
    //Timer
        //one Time
        //recurring
    //Document (HTML file)
        //mouse
        //keyboard
        //ideal event
        //timer
    //Window (browser)
        //tabs
        //resizing
//Timer
//api
//db/files handling
//Http request

//debouncing, ideal timing  
let timeout = setTimeout( () => {
    //Popup request
    console.log("i am inside setTimeout")
}, 3000)

//clear Timeout (timeout)

//polling
let interval = setInterval (() =>{
    console.log("i am inside setInterval")
},1000);



//map, forEach, Filter, some, every