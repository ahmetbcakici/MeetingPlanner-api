import express from 'express';
import mongoose from 'mongoose';
import FreeOne from './models/FreeOne';
const router = express.Router();
require('dotenv').config();

mongoose.connect(process.env.DB_URI, err => {
    if (err) throw err;
    console.log('MongoDB connection is successful via Mongoose!');
});

router.get('/freeone', async(req, res) => {
    const { itemID } = await req.query;

    try {
        const item = await FreeOne.findById(itemID);
        return res.status(200).send(item);
    } catch (err) {
        return res.status(500).send({ message: err.message });
    }
});

router.post('/freeone', (req, res) => {
    const { pollTitle, additionalDescriptions, userName, emailAddress, possibleDates } = req.body;

    FreeOne.create({
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

router.post('/participant', async(req, res) => {
    const { itemID } = req.query;
    const { partipicantName, optionsSelected } = req.body;
    const docs = await FreeOne.find({});
    docs.map(item => {
        const clientItemID = JSON.stringify(item._id).substr(1, 5);
        if (clientItemID === itemID) {
            console.log("bulundu x")
            res.send(item);
            return;
        }
    });

});

export default router;
