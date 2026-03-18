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

(async () => {
  try {
    await randomString(0);
  } catch (exception) {
    console.log(exception.message);
  }
})();

// create a js function to accept string date or date and expected format
// Return the date string into expected formatted text

//Date=> yyyy-mm-ddThh:mm:ss:msZ

// dateConveter ("2022-11-15T02:00:00", "dd-mm-yyyy") => //"15-11-2022"
// dateConveter ("2022-11-15T02:00:00", "mm-dd-yyyy") => //"11-15-2022"
// dateConveter ("2022-11-15T02:00:00", "yyyy-dd-mm") => //"2022-15-11"
const numbPad = (num) => {
  return num < 10 ? `0${num}` : num;
};
const dateConverter = async (dateStr, format) => {
  const date = new Date(dateStr); //type Casting
  //date => object of Date Class
  const year = date.getFullYear();
  const month = numbPad(date.getMonth() + 1);
  const day = numbPad(date.getDate());
  if (format === "dd-mm-yyyy") {
    return `${day}-${month}-${year}`;
  } else if ((format = "yyyy-dd-mm")) {
    return `${year}-${day}-${month}`;
  } else if ((format = "mm-dd-yyyy")) {
    return `${month}-${day}-${year}`;
  } else {
    throw "Invalid Format";
  }
};

// const handle = async() =>{
//   await dateConverter("2022-11-15T02:00:00", "dd-mm-yyyy");
//   await dateConverter("2022-11-15T02:00:00", "mm-dd-yyyy");
//   await dateConverter("2022-11-15T02:00:00", "yyyy-dd-mm");
// }
// handle()

(async () => {
  try {
    console.log(await dateConverter("2022-11-15T02:00:00", "dd-mm-yyyy"));
    console.log(await dateConverter("2022-11-15T02:00:00", "mm-dd-yyyy"));
    console.log(await dateConverter("2022-11-15T02:00:00", "yyyy-dd-mm"));
  } catch (exception) {
    console.log(exception);
  }
})()

//oop
//DSA
//typescript
