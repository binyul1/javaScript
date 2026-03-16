const login = async (username, password) => {
  if (username === "admin" && password === "admin") {
    //resolved
    return { msg: "Login Success" };
  } else {
    throw { message: "Login Failed" };
  }
};

const accessDashboard = async () => {
  return { msg: "Access Dashboard" };
};

//IIFE
//single run function => prefer IIFE
// ( async() => {
//     //
//     const result = await login("admin", "admin");
//     const result2 = await accessDashboard();
//     console.log(result.msg);
//     console.log(result2.msg)
//     console.log("i am last line");
// }) ()

//Multi run function => prefer main()
const main = async () => {
  const result = await login("admin", "admin");
  const result2 = await accessDashboard();
  console.log(result.msg);
  console.log(result2.msg);
  console.log("i am last line");
};

// main()(
//promise chain
// login("admin", "admin")
//   .then((res) => {
//     console.log(res.msg);
//     return accessDashboard();
//   })
//   .then((res) => {
//     //i am resolv of accessDashboard
//     console.log(res.msg);
//   })
//   .catch((exception) => {
//     console.log(exception.message);
//   })
//   .finally(() => {

//   });

//create a javascript async function to get the discount amount and after discounted price on a product after calculation
const discountcalc = async (prodpric, disper) => {
  const discount = (prodpric * disper) / 100;
  const finalprice = prodpric - discount;
  return { discount_amount: discount, productprice: finalprice };
};
(async () => {
  const amount = await discountcalc(500, 15);
  console.log("product discount is : ", amount.discount_amount);
  console.log("product final amount is :", amount.productprice);
})();

const main1 = async () => {
  const amount = await discountcalc(5250, 5);
  console.log("product discount is : ", amount.discount_amount);
  console.log("product final amount is :", amount.productprice);
};
main1();
