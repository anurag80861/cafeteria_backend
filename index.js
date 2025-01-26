
require('dotenv').config;
require('./config/connection');
const express = require('express');
const cors = require('cors');


const userRouter = require('./routes/users')
const dishRouter = require('./routes/dishes')
const counterRouter = require('./routes/counters');
const cartRouter = require('./routes/cart')

const app = express();

//Middleware
app.use(express.json());
app.use(cors());

app.use('/users', userRouter);
app.use('/dishes', dishRouter);
app.use('/counters', counterRouter);
app.use('/cart', cartRouter);

//start the server

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`server running on http://localhost:${PORT}`);
})