class Multiply {
  multiply(n, m) {
    for (let j = 1; j <= m; j++) {
      for (let i = 1; i <= 10; i++) {
        console.log(`${j} * ${i} = ${j * i}`);
      }
      console.log("***********")
    }
  }
}
export const mul = new Multiply();

module.media
//export default Multiply;
