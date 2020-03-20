import express from 'express';
import mongoose from 'mongoose';
import FreeOne from './models/FreeOne';
const router = express.Router();
require('dotenv').config();

mongoose.connect(process.env.DB_URI, err => {
	if (err) throw err;
	console.log('MongoDB connection is successful via Mongoose!');
});

router.get('/freeone', async (req, res) => {
	/*

	const { itemID } = req.query; 
	// itemID = 5e73a
	// _id = 5e73a72ec9abd72648aaa6c2
	const doc = await FreeOne.findOne({ _id: itemID }).catch(err => {
		// if (err.message instanceof mongoose.Error.CastError) httpResponse.success(res, 'Data was not found', null);
		//dont do anything
	});
	console.log(itemID)
	if (!doc) console.log('doc bos');
	res.send(doc);

	*/

	const { itemID } = req.query;
	// itemID = 5e73a
	// _id = 5e73a72ec9abd72648aaa6c2
	const docs = await FreeOne.find({});
	docs.map(item => {
		const clientItemID = JSON.stringify(item._id).substr(1, 5);
		if (clientItemID === itemID){
			console.log("bulundu")
			res.send(item);
			return;
		}
		// console.log("map son");
	});
	// console.log("bitti")
});

router.post('/freeone', (req, res) => {
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

router.post('/participant', (req, res) => {
	const { itemID } = req.query;
	const { partipicantName, optionsSelected } = req.body;

	console.log(itemID);
	console.log(req.body);
	res.send('a');
});

export default router;
