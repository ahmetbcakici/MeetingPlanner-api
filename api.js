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
    const doc = await FreeOne.findOne({ clientID: itemID });
    res.send(doc);
});

router.post('/freeone', (req, res) => {
    const {
        pollTitle,
        additionalDescriptions,
        userName,
        emailAddress,
        possibleDates,
    } = req.body;
    const clientID = pollTitle[0] + Date.now();

    FreeOne.create({
            clientID,
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
    const { participantName, optionsSelected } = req.body;
    const doc = await FreeOne.findOne({ clientID: itemID });
    doc.participants.push({
        participantName,
        optionsSelected,
    });
    doc.save().then(() => res.send(doc));

    /*const docs = await FreeOne.find({});
    docs.map(doc => {
        const clientItemID = JSON.stringify(doc._id).substr(20, 5);
        if (clientItemID === itemID) {
            doc.participants.push({
                participantName,
                optionsSelected,
            });
            doc.save().then(() => res.send(doc));
            return;
        }
    }); */
});

export default router;