import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const participantsSchema = new Schema({
    participantName: String,
    optionsSelected: [Number],
});

const freeOneSchema = new Schema({
    clientID: String,
    boardTitle: String,
    description: String,
    pollAnswers: [String],
    nameOwner: String,
    emailOwner: String,
    possibleDates: [String],
    participants: [participantsSchema],
});

const clientIDGenerate = () => {

}

export default mongoose.model('FreeOne', freeOneSchema);