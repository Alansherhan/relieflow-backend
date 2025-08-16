import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import {signUp } from './src/controllers/userController.js';
import router from './src/routes/userRoutes.js';
dotenv.config();


const app = express();

const db = mongoose.connect(process.env.MONGO_URL).then((v) => console.log("xonnected"))
app.use(express.json());

app.use('/api/test', async (req, res) => {
    res.status(201).json({ message: "API Called " });
});
app.use('/api/sum', async (req, res) => {
    res.status(201).json({ message: sum });
});
var a = 5, b = 5;
var sum = a + b;
app.use('/api/hello', async (req, res) => {
    res.status(201).json({ message: "Hello Alan" });
});

app.listen(3000, () => console.log("Server running on port 3000"));

app.use('/api/users', signUp);
app.use(router);
app.use(express.static('public'));