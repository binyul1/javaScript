const func1 = async (x) => {
  if (x) {
    return "i am return from func1";
  } else {
    throw "I am reject from func1";
  }
};
const func2 = async (x) => {
  if (x) {
    return "i am return from func2";
  } else {
    throw "I am reject from func2";
  }
};
//Libuv => nodejs asynce io operation library
//v8 engint => chrome c++ engine that compiles js
(async () => {
  let res1 = await func1(true);
  let res2 = await func2(true);
})();

let loading = false;
//validation
const validation = async () => {
  //block
};
const apiCaller = async () => {
  //fetch, axios
};

const loginFunc = async () => {
  loading = true;
  //validation
  const validState = await validation();
  //pass
  //apicall
  const apiResponse = await apiCaller();
  //pass
};
//.ceil() =>
//.floor() =>
//build an async function to get random string of n length
const randomString = async (n) => {
  const char = "0987654321qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM";
  const length = char.length;
  let randomStr = "";
  for (let i = 0; i <= n; i++) {
    const posn = Math.ceil(Math.random() * length);
    const str = char[posn];
    randomStr += str;
  }
  return randomStr;
};
(async () => {
  const randStr = await randomString(5);
  console.log(randStr);
})();

// create a js function to accept string date or date and expected format
// Return the date string into expected formatted text

// dateConveter ("2022-11-15T02:00:00", "dd-mm-yyyy") => //"15-11-2022"

//oop
//DSA
//typescript
