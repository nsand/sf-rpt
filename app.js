const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const request = require('request');

const app = express();

const port = process.argv[2] || 3030;

const API_HOST = 'http://restedblog.herokuapp.com/nick/api/';

app.use(bodyParser.json());

app.get('/', (req, res) => {
	res.status(200).sendFile(path.resolve(__dirname, 'index.html'));
});

['bundles', 'styles'].forEach(folder => app.use(`/${folder}`, express.static(path.resolve(__dirname, folder))));

/**
 * Set up a proxy to talk to the API server
 */
app.use('/api/:id?', (req, res) => {
	const options = {
		method: req.method,
		uri: `${API_HOST}${req.params.id || ''}`,
	}
	if (req.method.toLocaleUpperCase() === 'POST') {
		// Add data for update / create commands
		options.json = req.body;
	};
	request(options).pipe(res);
});

app.listen(port, () => {
	console.log(`Blog server listening on port ${port}`);
});
