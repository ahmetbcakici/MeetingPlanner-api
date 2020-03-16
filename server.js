import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import api from './api';
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 8080;
app.use(cors());
app.use(bodyParser.json());
app.use('./api', api);

app.get('/', (req, res) => {
	res.send('test');
});

app.post('/', (req, res) => {
	console.log('post');
	console.log(req.body);
	res.send('from-the-server');
});

app.listen(PORT, () => {
	console.log(`Server is running on ${PORT}!`);
});
