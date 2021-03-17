const fs = require("fs");
const express = require('express');
const app = express();
const PORT = 3000;
const bodyParser = require('body-parser');

const superSimpleDatabaseFileLocation = "database.txt";

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (request, response) => {
	response.send('Hello World');
});

app.get('/readdata', (request, response) => {
	try {
		fs.readFile(superSimpleDatabaseFileLocation, "utf-8", (err, data) => {
			if (err) {
				response.send(err);

			} else {
				response.json(data);

			}
		})
	} catch (e) {
		response.send(e);

	}
});

app.get('/createdata', (request, response) => {

	// No data is passed to the create data route
	try {
		fs.writeFile(superSimpleDatabaseFileLocation, "", (err) => {
			if (err) {
				response.send(err);
			} else {
				response.send(true);
			}

		});

	} catch (e) {
		response.send(e);

	}
});

app.post('/writedata', (request, response) => {

	// Handle the request post data to insert into file
	// console.log("api called");
	response.send(request.body);
	let data = request.body; //myList $rootScope.items = request
	// console.log(data);
	// try {
	// 	fs.writeFile(superSimpleDatabaseFileLocation, data, (err) => {
	// 		if (err) {
	// 			response.send(err);
	// 		} else {
	// 			response.json(data);
	// 		}

	// 	});

	// } catch (e) {
	// 	response.send(e);

	// }
});


function server() {
	app.use(express.json());
	app.listen(PORT, () => console.log(`Express server currently running on port ${PORT}`));
}

exports.server = server;
