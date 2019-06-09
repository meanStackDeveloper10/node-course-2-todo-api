const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');

let data = {
    id: 4
};

let token = jwt.sign(data, '123abc');
console.log('Token : ', token);

let decoded = jwt.verify(token, '123abc')
console.log('decoded : ', decoded);

// let message = 'I am numner 3';
// let hash = SHA256(message).toString()

// // console.log(message);
// // console.log(hash);

// let data = {
//     id: 4
// };

// let token = {
//     data,
//     hash: SHA256(JSON.stringify(data) + 'somesecret').toString()
// }

// token.data.id = 5;
// token.hash = SHA256(JSON.stringify(token.data)).toString();

// let tokenHash = SHA256(JSON.stringify(token.data) + 'somesecret').toString()

// if (tokenHash === token.hash) {
//     console.log('Data was not changed');
// } else {
//     console.log('Data was changed. Do not trust anyone!!');
// }