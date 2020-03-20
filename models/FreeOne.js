import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const participantsSchema = new Schema({
	participantName: String,
	optionsSelected: Array,
});

const freeOneSchema = new Schema({
	boardTitle: {
		type: String,
		required: true,
	},
	description: String,
	pollAnswers: Array,
	nameGenerater: {
		type: String,
		required: true,
	},
	emailGenerater: String,
	possibleDates: Array,
	participants: [participantsSchema],
});

export default mongoose.model('FreeOne', freeOneSchema);
