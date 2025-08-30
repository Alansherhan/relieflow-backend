import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import router from './src/routes/apiRoutes.js';
dotenv.config();


const app = express();

const db = mongoose.connect(process.env.MONGO_URL).then((v) => console.log("connected"))
app.use(express.json());
app.use(express.static('public'));
app.use("/",router);

app.listen(3000, () => console.log("Server running on port 3000"));


