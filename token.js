const jwt = require('jsonwebtoken');
//כניסה עם הטוקן הנכון
const token = jwt.sign({Uid: 23, Email: "gavrime11@gmail.com" }, "myprivtetoken", {expiresIn: '1h'});
console.log(token);

try {// בודק את הטוקן
    const obj = jwt.verify(token, "test"); // Use the same secret used for signing
    console.log(obj);
} catch (error) {
    console.error("Token Verification Failed:", error.message);
}