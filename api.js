import express from 'express';
import mongoose from 'mongoose';
import FreeOne from './models/FreeOne';
const router = express.Router();
require('dotenv').config();

mongoose.connect(process.env.DB_URI, err => {
	if (err) throw err;
	console.log('MongoDB connection is successful via Mongoose!');
});

router.get('/', async (req, res) => {
	const { itemID } = req.query;
	// const x = await FreeOne.find({ _id: itemID });
	// console.log(x);
	// const doc = await FreeOne.findById(itemID);
	const doc = await FreeOne.findOne({ _id: itemID }).catch(err => {
		// if (err.message instanceof mongoose.Error.CastError) httpResponse.success(res, 'Data was not found', null);
		//dont do anything
	});
	if (!doc) console.log('doc bos');
	console.log(doc);

	res.send('indx');
});

router.post('/', (req, res) => {
	const { pollTitle, additionalDescriptions, userName, emailAddress, possibleDates } = req.body;

	FreeOne.create(
		{
			boardTitle: pollTitle,
			description: additionalDescriptions,
			nameGenerater: userName,
			emailGenerater: emailAddress,
			possibleDates: possibleDates,
		},
		err => {
			if (err) throw err;
			console.log('kaydedildi');
		}
	);

	res.send('success');
});

export default router;
