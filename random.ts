const randomString = (n: number): string => {
  if (n <= 0) {
    throw "Invalid Input";
  }
  const char: string =
    "0987654321qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM";
  const length: number = char.length;
  let randomStr: string = "";
  for (let i = 0; i <= n; i++) {
    const posn: number = Math.ceil(Math.random() * length);
    const str: string = char[posn];
    randomStr += str;
  }
  return randomStr;
};

console.log(randomString(100));

//  react => tsx react codes => compiler -> html,css,js (Vite)
//  express => ts =>ts-node => build=> js bundle

//javascript dom manuplation
//frontend start