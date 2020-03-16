import express from 'express';
import mongoose from 'mongoose';
import FreeOne from './models/FreeOne';
const router = express.Router();
require('dotenv').config();

mongoose.connect(process.env.DB_URI, err => {
	if (err) throw err;
	console.log('MongoDB connection is successful via Mongoose!');
});

// FreeOne.find({}, (err, data) => {
// 	console.log(data);
// });

export default router;
