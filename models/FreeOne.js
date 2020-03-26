import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const participantsSchema = new Schema({
    participantName: String,
    optionsSelected: [Number],
});

const commentsSchema = new Schema({
    senderName: String,
    comment: String,
});

const freeOneSchema = new Schema({
    clientID: String,
    boardTitle: String,
    description: String,
    pollAnswers: [String],
    ownerName: String,
    ownerEmail: String,
    possibleDates: [String],
    participants: [participantsSchema],
    comments: [commentsSchema],
});

const clientIDGenerate = () => {};

export default mongoose.model('FreeOne', freeOneSchema);