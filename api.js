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
    console.log(req.ips);
    const { itemID } = await req.query;
    const doc = await FreeOne.findOne({ clientID: itemID });
    res.send(doc);
});

router.post('/freeone', (req, res) => {
    const {
        pollTitle,
        additionalDescriptions,
        ownerName,
        ownerEmail,
        possibleDates,
    } = req.body;

    const clientID = pollTitle[0] + Date.now() + pollTitle[1]; // to make it here bad practice

    FreeOne.create({
            clientID,
            boardTitle: pollTitle,
            description: additionalDescriptions,
            ownerName,
            ownerEmail,
            possibleDates: possibleDates,
        },
        err => {
            if (err) throw err;
        }
    );

    res.send(clientID);
});

router.post('/participant', async(req, res) => {
    const { itemID } = req.query;
    const { participantName, optionsSelected } = req.body;
    const doc = await FreeOne.findOne({ clientID: itemID });
    doc.participants.push({
        participantName,
        optionsSelected,
    });
    doc.save();
    res.send(doc);
});

router.post('/comment', async(req, res) => {
    const { itemID } = req.query;
    const { senderName, comment } = req.body;
    const doc = await FreeOne.findOne({ clientID: itemID });
    doc.comments.push({
        senderName,
        comment,
    });
    doc.save();
    res.send(doc);
});

export default router;