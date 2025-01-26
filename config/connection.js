const dotenv = require('dotenv');
dotenv.config();
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((error) => {
        console.log(error.message);
    })

// async function mongoConnect(){
//     try {
//         await mongoose.connect(process.env.MONGO_URI);
//         console.log("Connected to database");
//     } catch(err) {
//         console.log(err.message)
//     }
// }

module.exports = {};