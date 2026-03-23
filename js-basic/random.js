var randomString = function (n) {
    if (n <= 0) {
        throw "Invalid Input";
    }
    var char = "0987654321qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM";
    var length = char.length;
    var randomStr = "";
    for (var i = 0; i <= n; i++) {
        var posn = Math.ceil(Math.random() * length);
        var str = char[posn];
        randomStr += str;
    }
    return randomStr;
};
console.log(randomString(100));
