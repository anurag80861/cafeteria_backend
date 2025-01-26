require('dotenv').config();
const express = require('express');
const cors = require('cors');
require('./config/connection');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')
const USERS = require("./models/user")

let sessions = new Set();

const app = express();
app.use(express.json());

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));



app.post("/token", (req, res) => {
    const refreshToken = req.body.token;
    if (!sessions.has(refreshToken)) return res.status(403).json({ message: "Forbidden" });

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, data) => {
        if (err) return res.status(403).json({ message: "Forbidden", error: err.message });
        const token = generateAccessToken({ user: data.user });
        res.json({ token });
    });
});

app.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await USERS.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Username not registered!" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "PassWord Incorrect!" });
        }

        const token_data = { user: user };

        const refresh_token = jwt.sign(token_data, process.env.REFRESH_TOKEN_SECRET);
        sessions.add(refresh_token);

        const token = generateAccessToken(token_data);
        return res.json({ token: token, refresh_token: refresh_token });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.post("/register", async (req, res) => {
    try {
        const { name, email, password, role } = req.body;
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);
        const user = new USERS({
            name,
            email,
            role,
            password: hashedPassword
        });

        const savedUser = await user.save();
        res.status(201).json({ savedUser, message: "User registered successfully" });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});




function generateAccessToken(token_data) {
    return jwt.sign(token_data, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '3h' });
}

app.listen(5001, () => {
    console.log('Server is running on port 5001');
});

